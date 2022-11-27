package auth

import (
	"github.com/DigitalBiologyPlatform/Backend/defines"
	"github.com/getkin/kin-openapi/openapi3filter"
)

type AuthInterface interface {
	GetAuthenticator() openapi3filter.AuthenticationFunc
	NewAccessToken(username string, password string) (*defines.LoginToken, error)
	VerifyHCaptcha(captchaToken string) error
}
