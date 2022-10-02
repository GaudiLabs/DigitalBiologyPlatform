package repository

import "github.com/DigitalBiologyPlatform/Backend/defines"

type RepositoryInterface interface {
	CreateUser(defines.User) error
	StoreToken(defines.LoginToken) error
	GetUserTokens(username string) error
	GetUser(username string) (defines.User, error)
}
