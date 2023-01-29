package config

import (
	"fmt"

	"github.com/spf13/viper"
)

// Ensure config interface is implemented
var _ ConfigInterface = (*ViperConfig)(nil)

const errorFormat string = "configuration error : '%s' key is missing"

type ViperConfig struct {
	serverHost             string
	serverPort             string
	postgresUser           string
	postgresPassword       string
	postgresDatabaseName   string
	postgresHost           string
	postgresPort           string
	hCaptchaSecret         string
	hCaptchaVerifyURL      string
	tokenTTL               int
	defaultPaginationLimit int
}

func newViperConfig() (ViperConfig, error) {
	var returnedConfig ViperConfig

	//Setting config (viper)
	viper.AutomaticEnv()
	viper.SetConfigFile(".env")
	err := viper.ReadInConfig()
	if err != nil {
		return returnedConfig, err
	}

	//viper.Unmarshal(&returnedConfig)
	//returnedConfig.serverHost, err := viper.GetString("SERVER_PORT")
	envConfigName := "SERVER_PORT"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.serverPort = viper.GetString(envConfigName)

	envConfigName = "SERVER_HOST"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.serverHost = viper.GetString(envConfigName)

	envConfigName = "POSTGRES_DATABASE_HOST"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.postgresHost = viper.GetString(envConfigName)

	envConfigName = "POSTGRES_DATABASE_PORT"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.postgresPort = viper.GetString(envConfigName)

	envConfigName = "POSTGRES_DATABASE_USER"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.postgresUser = viper.GetString(envConfigName)

	envConfigName = "POSTGRES_DATABASE_PASSWORD"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.postgresPassword = viper.GetString(envConfigName)

	envConfigName = "POSTGRES_DATABASE_NAME"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.postgresDatabaseName = viper.GetString(envConfigName)

	envConfigName = "HCAPTCHA_SECRET"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.hCaptchaSecret = viper.GetString(envConfigName)

	envConfigName = "HCAPTCHA_VERIFY_URL"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.hCaptchaVerifyURL = viper.GetString(envConfigName)

	envConfigName = "TOKEN_SECONDS_TTL"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.tokenTTL = viper.GetInt(envConfigName)

	envConfigName = "DEFAULT_PAGINATION_LIMIT"
	if !viper.IsSet(envConfigName) {
		return returnedConfig, fmt.Errorf(errorFormat, envConfigName)
	}
	returnedConfig.defaultPaginationLimit = viper.GetInt(envConfigName)

	return returnedConfig, nil
}

func (config *ViperConfig) GetServerPort() string {
	return config.serverPort
}
func (config *ViperConfig) GetServerHost() string {
	return config.serverHost
}
func (config *ViperConfig) GetPostgresHost() string {
	return config.postgresHost
}
func (config *ViperConfig) GetPostgresPort() string {
	return config.postgresPort
}
func (config *ViperConfig) GetPostgresPassword() string {
	return config.postgresPassword
}
func (config *ViperConfig) GetPostgresDatabaseName() string {
	return config.postgresDatabaseName
}
func (config *ViperConfig) GetPostgresUser() string {
	return config.postgresUser
}
func (config *ViperConfig) GethCaptchaSecret() string {
	return config.hCaptchaSecret
}
func (config *ViperConfig) GethCaptchaVerifyURL() string {
	return config.hCaptchaVerifyURL
}
func (config *ViperConfig) GetTokenTTL() int {
	return config.tokenTTL
}
func (config *ViperConfig) GetDefaultPaginationLimit() int {
	return config.defaultPaginationLimit
}
