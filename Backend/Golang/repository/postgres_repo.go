package repository

import (
	"database/sql"
	"embed"
	"fmt"
	"log"

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

func (repo *PostgresRepo) CreateProtocol(protocol defines.FullProtocol) (int, error) {
	const filename = "POSTGRESQL/CreateProtocol.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
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

	result, err := repo.dbConn.Exec(string(queryBytes), protocol)
	if err != nil {
		return -1, err
	}

	//TODO : what is this, check ?
	//TODO : this ID needs to be returned
	_ = result

	return -1, nil
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
