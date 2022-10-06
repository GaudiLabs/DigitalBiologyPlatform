package auth

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/DigitalBiologyPlatform/Backend/defines"
	"github.com/DigitalBiologyPlatform/Backend/repository"
	"github.com/DigitalBiologyPlatform/Backend/utils"
	"github.com/davecgh/go-spew/spew"
	"github.com/getkin/kin-openapi/openapi3filter"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrorInvalidCredentials = fmt.Errorf("Invalid credentials")
	ErrorInvalidToken       = fmt.Errorf("Invalid token")
	ErrNoAuthHeader         = fmt.Errorf("Authorization header is missing")
	ErrInvalidAuthHeader    = fmt.Errorf("Authorization header is malformed")
)

type Authentifier struct {
	repo repository.RepositoryInterface
}

// Ensure auth interface is implemented
var _ AuthInterface = (*Authentifier)(nil)

func NewAuthentifier(repo repository.RepositoryInterface) *Authentifier {
	return &Authentifier{repo: repo}
}

/*
func newToken() (token defines.LoginToken, err e) {
	var returnedToken defines.LoginToken

	newTokenString := utils.TokenGenerator(32)

	returnedToken.Token = newTokenString
	returnedToken.ExpirationDate = time.Now()

	spew.Dump(returnedToken)
	return returnedToken, nil
}
*/

func (a *Authentifier) GetAuthenticator() openapi3filter.AuthenticationFunc {
	return func(ctx context.Context, input *openapi3filter.AuthenticationInput) error {
		return a.authenticate(ctx, input)
	}
}

func GetTokenObjectFromRequest(req *http.Request) (defines.AuthToken, error) {
	var returnedToken defines.AuthToken

	authHdr := req.Header.Get("Authorization")
	// Check for the Authorization header.
	if authHdr == "" {
		return returnedToken, ErrNoAuthHeader
	}

	// We expect a header value of the form "Bearer <token>", with 1 space after
	prefix := "Bearer "
	if !strings.HasPrefix(authHdr, prefix) {
		return returnedToken, ErrInvalidAuthHeader
	}
	trimmedToken := strings.TrimPrefix(authHdr, prefix)

	//TODO: b64 error check
	token, _ := base64.StdEncoding.DecodeString(trimmedToken)

	err := json.Unmarshal(token, &returnedToken)
	if err != nil {
		return returnedToken, err
	}

	return returnedToken, nil
}

// Authenticate uses the specified validator to ensure a JWT is valid, then makes
// sure that the claims provided by the JWT match the scopes as required in the API.
func (a *Authentifier) authenticate(ctx context.Context, input *openapi3filter.AuthenticationInput) error {
	// Our security scheme is named BearerAuth, ensure this is the case
	if input.SecuritySchemeName != "BearerAuth" {
		return fmt.Errorf("security scheme %s != 'BearerAuth'", input.SecuritySchemeName)
	}

	tokenObj, err := GetTokenObjectFromRequest(input.RequestValidationInput.Request)
	if err != nil {
		return err
	}
	spew.Dump(tokenObj)
	//TODO : clean expired tokens here ?

	user, err := a.repo.GetUser(tokenObj.Username)
	if err != nil {
		return err
	}
	spew.Dump(user)

	for _, element := range user.Tokens {
		if element.Token == tokenObj.Token {
			//Token found, access granted
			return nil
		}
	}
	return ErrorInvalidToken
}

// Authenticate uses the specified validator to ensure a JWT is valid, then makes
// sure that the claims provided by the JWT match the scopes as required in the API.
func (a *Authentifier) NewAccessToken(username string, password string) (*defines.LoginToken, error) {
	// Our security scheme is named BearerAuth, ensure this is the case
	var returnedToken defines.LoginToken

	user, err := a.repo.GetUser(username)
	if err != nil {
		//TODO: handle error
		spew.Dump(err)
		return nil, err
	}

	/*
		bts, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		spew.Dump(string(bts))
	*/

	// Comparing the password with the hash
	hashCompareError := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if hashCompareError != nil {
		return nil, ErrorInvalidCredentials
	}

	//TODO: make this configurable via viper
	returnedToken.Token = utils.TokenGenerator(32)
	returnedToken.ExpirationDate = time.Now().Add(1 * time.Hour)

	a.repo.StoreToken(username, returnedToken)

	return &returnedToken, nil
}
