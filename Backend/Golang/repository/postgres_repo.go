package repository

import (
	"database/sql"
	"fmt"

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
	defer db.Close()

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

func (*PostgresRepo) CreateUser(User) error {
	return nil
}

func (*PostgresRepo) StoreTokenForUser(LoginToken) error {
	return nil
}
