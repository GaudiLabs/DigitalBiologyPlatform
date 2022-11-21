package config

import "fmt"

var Config ConfigInterface

type ConfigInterface interface {
	GetServerPort() string
	GetServerHost() string
	GetPostgresHost() string
	GetPostgresPort() string
	GetPostgresPassword() string
	GetPostgresDatabaseName() string
	GetPostgresUser() string
}

func LoadConfig() {
	allocatedConfig, err := newViperConfig()
	if err != nil {
		panic(err)
	}
	Config = &allocatedConfig
}

func GetConfig() ConfigInterface {
	if Config == nil {
		panic(fmt.Errorf("config has not been initialized, call LoadConfig() first"))
	}
	return Config
}
