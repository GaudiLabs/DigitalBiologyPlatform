package auth

import (
	"crypto/rand"
	"fmt"
	"time"

	"github.com/DigitalBiologyPlatform/Backend/defines"
	"github.com/DigitalBiologyPlatform/Backend/repository"
	"github.com/davecgh/go-spew/spew"
	"github.com/labstack/echo/v4"
)

type Authenticator interface {
	BasicAuthValidator(username, password string, c echo.Context) (bool, error)
}

type Authentifier struct {
	repo repository.RepositoryInterface
}

func NewAuthentifier(repo repository.RepositoryInterface) *Authentifier {
	return &Authentifier{repo: repo}
}

func tokenGenerator(length int) string {
	b := make([]byte, length)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

func NewToken(repo repository.RepositoryInterface, username string, password string) (token defines.LoginToken, err error) {
	var returnedToken defines.LoginToken

	newTokenString := tokenGenerator(32)

	returnedToken.Token = newTokenString
	returnedToken.ExpirationDate = time.Now()

	spew.Dump(returnedToken)
	return returnedToken, nil
}

func (a *Authentifier) BasicAuthValidator(username, password string, c echo.Context) (bool, error) {
	user, err := a.repo.GetUser(username)
	if err != nil {
		//TODO: handle error
		spew.Dump(err)
		return false, nil
	}
	//TODO: bcrypt pass compare
	if user.Password == password {
		return true, nil
	}
	//spew.Dump(a)
	return false, nil
}
