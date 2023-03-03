package repository

import (
	"database/sql"
	"embed"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"strings"
	"time"

	"github.com/DigitalBiologyPlatform/Backend/config"
	"github.com/DigitalBiologyPlatform/Backend/defines"
	"github.com/DigitalBiologyPlatform/Backend/utils"
	"github.com/davecgh/go-spew/spew"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

const (
	DBMagnetPrefix      = "magnet"
	DBTemperaturePrefix = "temp"
	DBPrefixDelimiter   = "_"
)

type PostgresRepo struct {
	host     string
	port     string
	user     string
	password string
	dbName   string
	dbConn   *sql.DB
}

// Electrode defines model for Electrode.
type Electrode struct {
	ElectrodeId string `json:"electrode_id,omitempty"`
	Value       int    `json:"value,omitempty"`
}

// Frame defines model for Frame.
type Frame struct {
	Features     []DbFeature           `json:"features,omitempty"`
	Duration     int                   `json:"duration,omitempty"`
	Electrodes   []Electrode           `json:"electrodes,omitempty"`
	Rank         int                   `json:"rank,omitempty"`
	Magnets      *[]IndexedMagnet      `json:"magnets,omitempty"`
	Temperatures *[]IndexedTemperature `json:"temperatures,omitempty"`
}

// IndexedMagnet defines model for IndexedMagnet.
type IndexedMagnet struct {
	Index int  `json:"index"`
	Value bool `json:"value"`
}

// IndexedTemperature defines model for IndexedTemperature.
type IndexedTemperature struct {
	Index int     `json:"index"`
	Value float32 `json:"value"`
}

// RankedAuthor defines model for RankedAuthor.
type RankedAuthor struct {
	Author string `json:"author,omitempty"`
	Rank   int    `json:"rank,omitempty"`
}

// ShortProtocol defines model for ShortProtocol.
type ShortProtocol struct {
	AuthorList    []RankedAuthor `json:"author_list"`
	AuthorRank    int            `json:"author_rank"`
	FrameCount    int            `json:"frame_count"`
	Id            int            `json:"id"`
	MaskFrame     []Frame        `json:"mask_frame"`
	Name          string         `json:"name"`
	Description   string         `json:"description"`
	TotalDuration int            `json:"total_duration"`
	DeviceID      int            `json:"device_id"`
}

// ShortProtocol defines model for ShortProtocol.
type DbProtocol struct {
	AuthorList    []RankedAuthor `json:"author_list"`
	FrameCount    int            `json:"frame_count"`
	Id            int            `json:"id"`
	Frames        []Frame        `json:"frames"`
	Name          string         `json:"name"`
	Description   string         `json:"description"`
	TotalDuration int            `json:"total_duration"`
	DeviceID      int            `json:"device_id"`
	MaskFrame     Frame          `json:"mask_frame"`
	Public        bool           `json:"public"`
}

type DbFeature struct {
	Value      int    `json:"value,omitempty"`
	FeatureKey string `json:"feature_id,omitempty"`
}

// Ensure repo interface is implemented
var _ RepositoryInterface = (*PostgresRepo)(nil)

// Embedding the sql files in ./POSTGRESQL
//
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
		host:     config.GetConfig().GetPostgresHost(),
		user:     config.GetConfig().GetPostgresUser(),
		port:     config.GetConfig().GetPostgresPort(),
		password: config.GetConfig().GetPostgresPassword(),
		dbName:   config.GetConfig().GetPostgresDatabaseName(),
	}

	outputRepo.dbConn, err = openConnection(outputRepo)
	if err != nil {
		return nil, err
	}

	//spew.Dump(outputRepo)
	return &outputRepo, nil
}

func (repo *PostgresRepo) GetAllDevices() ([]defines.Device, error) {
	const filename = "POSTGRESQL/GetDevices.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	var returnedDevices []defines.Device
	rows, err := repo.dbConn.Query(string(queryBytes))
	if err != nil {
		return returnedDevices, err
	}

	for rows.Next() {
		var deviceToAdd defines.Device
		err := rows.Scan(&deviceToAdd)
		if err != nil {
			//TODO: handle error
		}
		returnedDevices = append(returnedDevices, deviceToAdd)
	}

	//TODO: check SQL error ?

	return returnedDevices, nil

}

func (repo *PostgresRepo) OverwriteProtocol(protocolID int, protocol defines.FullProtocol, username string) error {

	var filename string

	filename = "POSTGRESQL/CreateFrameFeature.sql"
	createFrameFeatureQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

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

	filename = "POSTGRESQL/CreateAuthor.sql"
	createAuthorQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/UpdateProtocolByID.sql"
	updateProtocolQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteElectrodesOfProtocol.sql"
	deleteElectrodesQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteFramesOfProtocol.sql"
	deleteFramesQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteFeaturesOfProtocol.sql"
	deleteFeaturesQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteMaskFrameElectrodesOfProtocol.sql"
	deleteMaskFrameElectrodesQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteFrame.sql"
	deleteFrameQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/GetMaskFrameIDOfProtocol.sql"
	maskFrameQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteAuthorsOfProtocol.sql"
	deleteAuthorsQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	dbTransaction, err := repo.dbConn.Begin()
	if err != nil {
		return err
	}
	defer dbTransaction.Rollback()

	//Retreive old mask frame ID
	var oldMaskFrameID int64
	row := dbTransaction.QueryRow(string(maskFrameQuery), protocolID)
	//TODO: check SQL error ?
	err = row.Scan(&oldMaskFrameID)
	if err != nil {
		return err
	}

	//Deleting old electrodes
	_, err = dbTransaction.Exec(string(deleteElectrodesQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting old features
	_, err = dbTransaction.Exec(string(deleteFeaturesQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting old frames
	_, err = dbTransaction.Exec(string(deleteFramesQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting old mask frame electrodes
	_, err = dbTransaction.Exec(string(deleteMaskFrameElectrodesQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Creating mask frame
	var maskFrameID int64
	row = dbTransaction.QueryRow(string(createFrameQuery), nil, protocol.MaskFrame.Duration, -1)
	//TODO: check SQL error ?
	err = row.Scan(&maskFrameID)
	if err != nil {
		return err
	}
	spew.Dump("MASK FRAME ID:")
	spew.Dump(maskFrameID)

	//Populating mask frame
	for _, maskFrameElectrode := range protocol.MaskFrame.Electrodes {
		_, err := dbTransaction.Exec(string(createFrameElectrodeQuery),
			maskFrameID,
			maskFrameElectrode.Value,
			maskFrameElectrode.ElectrodeId,
			protocol.DeviceID,
		)
		if err != nil {
			return err
		}
	}

	//Overwriting protocol
	_, err = dbTransaction.Exec(string(updateProtocolQuery),
		protocolID,
		protocol.Name,
		protocol.Description,
		protocol.FrameCount,
		protocol.TotalDuration,
		maskFrameID,
		time.Now(),
		1,   //Version
		nil, //Fork of
		protocol.DeviceID,
		protocol.Public, //Public bool
	)
	spew.Dump(err)
	if err != nil {
		return err
	}

	//Deleting old mask frame
	_, err = dbTransaction.Exec(string(deleteFrameQuery),
		oldMaskFrameID,
	)
	if err != nil {
		spew.Dump(err)
		return err
	}

	//Deleting old authors
	_, err = dbTransaction.Exec(string(deleteAuthorsQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Create frames & populate these
	for _, frame := range protocol.Frames {
		//Creating frame
		var frameID int64
		row := dbTransaction.QueryRow(string(createFrameQuery), protocolID, frame.Duration, frame.Rank)
		err = row.Scan(&frameID)
		if err != nil {
			return err
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
				return err
			}
		}

		//TODO: For special features, check device ID

		if frame.Magnets != nil {
			//Populating magnets
			for _, magnet := range *frame.Magnets {
				//TODO : set magnet in consts
				hardwareFeatureName := fmt.Sprintf("%s%s%d", DBMagnetPrefix, DBPrefixDelimiter, magnet.Index)
				spew.Dump(hardwareFeatureName)
				_, err := dbTransaction.Exec(string(createFrameFeatureQuery),
					frameID,
					utils.BoolToInt(magnet.Value),
					hardwareFeatureName,
				)
				if err != nil {
					return err
				}
			}
		}

		if frame.Temperatures != nil {
			//Populating magnets
			for _, temperature := range *frame.Temperatures {
				//TODO : set temp in consts
				hardwareFeatureName := fmt.Sprintf("%s%s%d", DBTemperaturePrefix, DBPrefixDelimiter, temperature.Index)
				spew.Dump(hardwareFeatureName)
				_, err := dbTransaction.Exec(string(createFrameFeatureQuery),
					frameID,
					int(temperature.Value*100),
					hardwareFeatureName,
				)
				if err != nil {
					return err
				}
			}
		}
	}

	//Creating the authors
	_, err = dbTransaction.Exec(string(createAuthorQuery),
		protocolID,
		username,
		1, //Rank //TODO
	)
	if err != nil {
		return err
	}

	// Commit the transaction.
	if err = dbTransaction.Commit(); err != nil {
		return err
	}

	return nil
}

func (repo *PostgresRepo) DeleteProtocol(protocolID int) error {

	var filename string

	filename = "POSTGRESQL/DeleteFeaturesOfProtocol.sql"
	deleteFeaturesQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteElectrodesOfProtocol.sql"
	deleteElectrodesQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteFramesOfProtocol.sql"
	deleteFramesQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteMaskFrameElectrodesOfProtocol.sql"
	deleteMaskFrameElectrodesQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteFrame.sql"
	deleteFrameQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/GetMaskFrameIDOfProtocol.sql"
	maskFrameQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteAuthorsOfProtocol.sql"
	deleteAuthorsQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	filename = "POSTGRESQL/DeleteProtocol.sql"
	deleteProtocolQuery, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	dbTransaction, err := repo.dbConn.Begin()
	if err != nil {
		return err
	}
	defer dbTransaction.Rollback()

	//Retreive old mask frame ID
	var oldMaskFrameID int64
	row := dbTransaction.QueryRow(string(maskFrameQuery), protocolID)
	//TODO: check SQL error ?
	err = row.Scan(&oldMaskFrameID)
	if err != nil {
		return err
	}

	//Deleting old electrodes
	_, err = dbTransaction.Exec(string(deleteElectrodesQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting old features
	_, err = dbTransaction.Exec(string(deleteFeaturesQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting old frames
	_, err = dbTransaction.Exec(string(deleteFramesQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting old mask frame electrodes
	_, err = dbTransaction.Exec(string(deleteMaskFrameElectrodesQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting authors
	_, err = dbTransaction.Exec(string(deleteAuthorsQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting protocol
	_, err = dbTransaction.Exec(string(deleteProtocolQuery),
		protocolID,
	)
	if err != nil {
		return err
	}

	//Deleting old mask frame
	_, err = dbTransaction.Exec(string(deleteFrameQuery),
		oldMaskFrameID,
	)
	if err != nil {
		return err
	}

	// Commit the transaction.
	if err = dbTransaction.Commit(); err != nil {
		return err
	}

	return nil
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

	result, err := repo.dbConn.Exec(string(queryBytes), user.Login, hashedPassword, user.Email, user.Fullname, user.Institution, user.Website, user.Bio)
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

	filename = "POSTGRESQL/CreateFrameFeature.sql"
	createFrameFeatureQuery, err := embeddedSQL.ReadFile(filename)
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
		protocol.Public, //Public bool
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

		//TODO: For special features, check device ID

		if frame.Magnets != nil {
			//Populating magnets
			for _, magnet := range *frame.Magnets {
				//TODO : set magnet in consts
				hardwareFeatureName := fmt.Sprintf("%s%s%d", DBMagnetPrefix, DBPrefixDelimiter, magnet.Index)
				spew.Dump(hardwareFeatureName)
				_, err := dbTransaction.Exec(string(createFrameFeatureQuery),
					frameID,
					utils.BoolToInt(magnet.Value),
					hardwareFeatureName,
				)
				if err != nil {
					return -1, err
				}
			}

		}

		if frame.Temperatures != nil {
			//Populating magnets
			for _, temperature := range *frame.Temperatures {
				//TODO : set temp in consts
				hardwareFeatureName := fmt.Sprintf("%s%s%d", DBTemperaturePrefix, DBPrefixDelimiter, temperature.Index)
				spew.Dump(hardwareFeatureName)
				_, err := dbTransaction.Exec(string(createFrameFeatureQuery),
					frameID,
					int(temperature.Value*100),
					hardwareFeatureName,
				)
				if err != nil {
					return -1, err
				}
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

	rows := repo.dbConn.QueryRow(string(queryBytes), protocolID)

	var returnedProtocol defines.FullProtocol
	var jsonBytes []byte

	err = rows.Scan(&jsonBytes)
	if err != nil {
		return returnedProtocol, err
	}

	var DbProtocol DbProtocol
	json.Unmarshal(jsonBytes, &DbProtocol)
	spew.Dump("DBPROTOCOL:")
	spew.Dump(DbProtocol)

	for frameIndex, frame := range DbProtocol.Frames {
		var magnetList []IndexedMagnet
		var temperatureList []IndexedTemperature
		for _, feature := range frame.Features {
			split := strings.Split(feature.FeatureKey, DBPrefixDelimiter)
			if split[0] == DBMagnetPrefix {
				index, _ := strconv.Atoi(split[1])
				magnetList = append(magnetList, IndexedMagnet{Index: index, Value: utils.IntToBool(feature.Value)})
			} else if split[0] == DBTemperaturePrefix {
				index, _ := strconv.Atoi(split[1])
				temperatureList = append(temperatureList, IndexedTemperature{Index: index, Value: float32(feature.Value) / 100})
			}
			DbProtocol.Frames[frameIndex].Magnets = &magnetList
			DbProtocol.Frames[frameIndex].Temperatures = &temperatureList

		}
	}

	//json.Unmarshal(jsonBytes, &returnedProtocol)

	//TODO: check SQL error ?
	//err = rows.Scan(&returnedProtocol)
	//if err != nil {
	//	return returnedProtocol, err
	//}

	/*
		var returnedFeatures defines.FullProtocol
		err = rows.Scan(&returnedFeatures)
		if err != nil {
			return returnedProtocol, err
		}
	*/
	spew.Dump("FEATURES:")
	//spew.Dump(returnedFeatures)

	bytes, _ := json.Marshal(DbProtocol)
	//TODO: properly handle error
	json.Unmarshal(bytes, &returnedProtocol)

	spew.Dump("PROTOCOL:")
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
		return returnedProtocols, err
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

// GetUserProtocols returns the infos about the user passed as parameter as well as its valid access tokens
func (repo *PostgresRepo) GetPublicProtocols(limit int, offset int) ([]defines.ShortProtocol, error) {

	const filename = "POSTGRESQL/GetPublicProtocolsPaginated.sql"
	queryBytes, err := embeddedSQL.ReadFile(filename)
	if err != nil {
		log.Fatalf("Could not find embedded SQL file '%s' : %s", filename, err.Error())
	}

	//TODO : implement with new struct
	var returnedProtocols []defines.ShortProtocol
	rows, err := repo.dbConn.Query(string(queryBytes), limit, offset)
	if err != nil {
		return returnedProtocols, err
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
