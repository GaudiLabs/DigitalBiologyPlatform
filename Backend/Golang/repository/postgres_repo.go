package repository

import (
	"database/sql"
	"embed"
	"fmt"
	"log"
	"time"

	"github.com/DigitalBiologyPlatform/Backend/defines"
	"github.com/davecgh/go-spew/spew"
	_ "github.com/lib/pq"
	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"
)

type PostgresRepo struct {
	host     string
	port     string
	user     string
	password string
	dbName   string
	dbConn   *sql.DB
}

// Ensure auth interface is implemented
var _ RepositoryInterface = (*PostgresRepo)(nil)

//go:embed POSTGRESQL/*.sql
var embeddedSQL embed.FS

func openConnection(repo PostgresRepo) (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"dbname=%s sslmode=disable password=%s",
		repo.host, repo.port, repo.user, repo.dbName, repo.password)

	//spew.Dump(psqlInfo)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func NewPostgresRepo() (*PostgresRepo, error) {
	var err error
	outputRepo := PostgresRepo{
		host:     viper.GetString("POSTGRES_DATABASE_HOST"),
		port:     viper.GetString("POSTGRES_DATABASE_PORT"),
		user:     viper.GetString("POSTGRES_DATABASE_USER"),
		password: viper.GetString("POSTGRES_DATABASE_PASSWORD"),
		dbName:   viper.GetString("POSTGRES_DATABASE_NAME"),
	}

	outputRepo.dbConn, err = openConnection(outputRepo)
	if err != nil {
		return nil, err
	}

	//spew.Dump(outputRepo)
	return &outputRepo, nil
}

func (repo *PostgresRepo) getElectrodeIDsBySVGDenomination(deviceID int, svgDenominations []string) (map[string]int, error) {
	var returnedMap = make(map[string]int, len(svgDenominations))

	const filename = "POSTGRESQL/GetElectrodeIDsBySVGDenomination.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	rows, err := repo.dbConn.Query(string(queryBytes), svgDenominations, deviceID)
	if err != nil {
		//TODO: handle error
		return returnedMap, err
	}

	for rows.Next() {
		var svgDenomination string
		var electrodeID int
		err := rows.Scan(&svgDenomination, &electrodeID)
		if err != nil {
			//TODO: handle error
			return returnedMap, err
		}
		returnedMap[svgDenomination] = electrodeID
	}

	return returnedMap, err
}

func (repo *PostgresRepo) CreateUser(user defines.User) error {
	const filename = "POSTGRESQL/CreateUser.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	//spew.Dump(string(bts))

	result, err := repo.dbConn.Exec(string(queryBytes), user.Login, hashedPassword, user.Email)
	if err != nil {
		return err
	}

	//TODO : what is this, check ?
	_ = result

	return nil
}

func (repo *PostgresRepo) CreateProtocol(protocol defines.FullProtocol, username string) (int, error) {
	var filename string

	filename = "POSTGRESQL/CreateFrameElectrode.sql"
	createFrameElectrodeQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/CreateFrame.sql"
	createFrameQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/CreateProtocol.sql"
	createProtocolQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/CreateAuthor.sql"
	createAuthorQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	// THIS HAS TO BE A TRANSACTION
	//Store mask frame, keep mask_frame_id
	//Store enriched protocol with link to mask frame, keep protocol_id
	//Create frames linked to protocol_id, keep list of frames_id
	//For each frames create ascociated electrodes linked with frame_id

	dbTransaction, err := repo.dbConn.Begin()
	if err != nil {
		return -1, err
	}
	defer dbTransaction.Rollback()

	//Creating mask frame
	var maskFrameID int64
	row := dbTransaction.QueryRow(string(createFrameQuery), nil, protocol.MaskFrame.Duration, -1)
	//TODO: check SQL error ?
	err = row.Scan(&maskFrameID)
	if err != nil {
		return -1, err
	}

	//Populating mask frame
	for _, maskFrameElectrode := range protocol.MaskFrame.Electrodes {
		_, err := dbTransaction.Exec(string(createFrameElectrodeQuery),
			maskFrameID,
			maskFrameElectrode.Value,
			maskFrameElectrode.ElectrodeId,
			protocol.DeviceID,
		)
		if err != nil {
			return -1, err
		}
	}

	//Creating protocol
	var protocolID int64
	row = dbTransaction.QueryRow(string(createProtocolQuery),
		protocol.Name,
		protocol.Description,
		protocol.FrameCount,
		protocol.TotalDuration,
		maskFrameID,
		time.Now(),
		1,   //Version
		nil, //Fork of
		protocol.DeviceID,
		false, //Public bool
	)
	//TODO: check SQL error ?
	err = row.Scan(&protocolID)
	if err != nil {
		return -1, err
	}

	//Create frames & populate these
	for _, frame := range protocol.Frames {
		//Creating frame
		var frameID int64
		row := dbTransaction.QueryRow(string(createFrameQuery), protocolID, frame.Duration, frame.Rank)
		err = row.Scan(&frameID)
		if err != nil {
			return -1, err
		}
		//Populating create frame
		for _, electrode := range frame.Electrodes {
			_, err := dbTransaction.Exec(string(createFrameElectrodeQuery),
				frameID,
				electrode.Value,
				electrode.ElectrodeId,
				protocol.DeviceID,
			)
			if err != nil {
				return -1, err
			}
		}
	}

	_, err = dbTransaction.Exec(string(createAuthorQuery),
		protocolID,
		username,
		1, //Rank //TODO
	)
	if err != nil {
		return -1, err
	}

	// Commit the transaction.
	if err = dbTransaction.Commit(); err != nil {
		return -1, err
	}

	return int(protocolID), nil
}

func (repo *PostgresRepo) StoreToken(username string, loginToken defines.LoginToken) error {
	const filename = "POSTGRESQL/StoreToken.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	result, err := repo.dbConn.Exec(string(queryBytes), username, loginToken.Token, loginToken.ExpirationDate)
	if err != nil {
		return err
	}

	//TODO : what is this, check ?
	_ = result

	return nil
}

// GetUser returns the infos about the user passed as parameter as well as its valid access tokens
func (repo *PostgresRepo) GetUser(username string) (defines.User, error) {

	const filename = "POSTGRESQL/GetUser.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	var returnedUser defines.User
	rows := repo.dbConn.QueryRow(string(queryBytes), username)

	//TODO: check SQL error ?
	err = rows.Scan(&returnedUser)
	if err != nil {
		return returnedUser, err
	}
	spew.Dump(returnedUser)

	return returnedUser, nil
}

// GetUser returns the infos about the user passed as parameter as well as its valid access tokens
func (repo *PostgresRepo) GetProtocol(protocolID int) (defines.FullProtocol, error) {

	const filename = "POSTGRESQL/GetProtocolFull.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	var returnedProtocol defines.FullProtocol
	rows := repo.dbConn.QueryRow(string(queryBytes), protocolID)

	//TODO: check SQL error ?
	err = rows.Scan(&returnedProtocol)
	if err != nil {
		return returnedProtocol, err
	}
	spew.Dump(returnedProtocol)

	return returnedProtocol, nil
}

// GetUserProtocols returns the infos about the user passed as parameter as well as its valid access tokens
func (repo *PostgresRepo) GetUserProtocols(username string) ([]defines.ShortProtocol, error) {

	const filename = "POSTGRESQL/GetUserProtocols.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	//TODO : implement with new struct
	var returnedProtocols []defines.ShortProtocol
	rows, err := repo.dbConn.Query(string(queryBytes), username)
	if err != nil {
		//TODO: handle error
	}

	for rows.Next() {
		var shortProtocol defines.ShortProtocol
		err := rows.Scan(&shortProtocol)
		if err != nil {
			//TODO: handle error
		}
		returnedProtocols = append(returnedProtocols, shortProtocol)
	}

	//TODO: check SQL error ?
	/*
		err = rows.Scan(&returnedUser)
		if err != nil {
			return returnedUser, err
		}
		spew.Dump(returnedUser)
	*/

	return returnedProtocols, nil
}
