package repository

import "github.com/DigitalBiologyPlatform/Backend/defines"

type RepositoryInterface interface {
	CreateUser(defines.User) error
	StoreToken(username string, loginToken defines.LoginToken) error
	GetUser(username string) (defines.User, error)
	GetUserProtocols(username string) ([]defines.ShortProtocol, error)
	GetPublicProtocols(limit int, offset int) ([]defines.ShortProtocol, error)
	GetProtocol(protocolID int) (defines.FullProtocol, error)
	CreateProtocol(protocol defines.FullProtocol, username string) (protocolID int, err error)
	OverwriteProtocol(protocolID int, protocol defines.FullProtocol, username string) error
	DeleteProtocol(protocolID int) error
	//GetDeviceElectrodes(deviceID int) (electrodes []defines.Electrode, err error)
	//getElectrodeIDsBySVGDenomination(deviceID int, svgDenominations []string) (map[string]int, error)
}
