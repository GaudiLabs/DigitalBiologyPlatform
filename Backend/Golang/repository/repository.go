package repository

import "github.com/DigitalBiologyPlatform/Backend/defines"

type RepositoryInterface interface {
	CreateUser(defines.User) error
	StoreToken(username string, loginToken defines.LoginToken) error
	GetUser(username string) (defines.User, error)
	GetUserProtocols(username string) ([]defines.ShortProtocol, error)
	GetProtocol(protocolID int) (defines.FullProtocol, error)
	CreateProtocol(defines.FullProtocol) (protocolID int, err error)
}
