package repository

import (
	"database/sql"
	"fmt"

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

func openConnection(repo PostgresRepo) (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"dbname=%s sslmode=disable password=%s",
		repo.host, repo.port, repo.user, repo.dbName, repo.password)

	spew.Dump(psqlInfo)
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

	spew.Dump(outputRepo)
	return &outputRepo, nil
}

func (repo *PostgresRepo) CreateUser(defines.User) error {
	return nil
}

func (repo *PostgresRepo) StoreToken(defines.LoginToken) error {
	return nil
}

func (repo *PostgresRepo) GetUserTokens(username string) error {

	return nil
}

func (repo *PostgresRepo) GetUser(username string) (defines.User, error) {
	var returnedUser defines.User
	rows := repo.dbConn.QueryRow(
		`
		WITH users AS (
			SELECT
				*
			FROM
				users.user as u
	), tokens AS (
			SELECT 
				COALESCE(json_agg(jsonb_build_object(
			'token',ut.token,
			'expiration_date',TO_CHAR( ut.expiration_date AT TIME ZONE 'UTC', 'yyyy-mm-dd"T"hh24:mi:ss"Z"')
			)), '[]') AS tokens
			FROM users.token as ut
			JOIN users ON ut.user_id = users.id
			WHERE ut.expiration_date > NOW()
	)
	SELECT
		jsonb_build_object(
			'id', users.id,
			'login', users.login,
			'tokens', tokens.tokens,
			'password', users.password
			)
	FROM users, tokens
	WHERE users.login = $1
		`,
		username)

	err := rows.Scan(&returnedUser)
	if err != nil {
		return returnedUser, err
	}
	spew.Dump(returnedUser)

	return returnedUser, nil
}
