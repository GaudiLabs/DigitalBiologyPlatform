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

func (repo *PostgresRepo) CreateUser(defines.User) error {
	return nil
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
