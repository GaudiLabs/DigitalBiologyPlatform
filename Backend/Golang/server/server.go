package server

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/DigitalBiologyPlatform/Backend/auth"
	"github.com/DigitalBiologyPlatform/Backend/repository"
	"github.com/davecgh/go-spew/spew"
	"github.com/deepmap/oapi-codegen/pkg/middleware"
	"github.com/getkin/kin-openapi/openapi3filter"
	"github.com/labstack/echo/v4"
)

type Handlers struct {
	repository repository.RepositoryInterface
	auth       auth.AuthInterface
	data       string
}

// Ensure server interface is implemented
var _ ServerInterface = (*Handlers)(nil)

func NewHandlers(repository repository.RepositoryInterface, auth auth.AuthInterface) *Handlers {
	return &Handlers{
		repository: repository,
		auth:       auth,
		data:       "oh",
	}
}

func CreateAuthMiddleware(a auth.AuthInterface) (echo.MiddlewareFunc, error) {
	spec, err := GetSwagger()
	if err != nil {
		return nil, fmt.Errorf("loading spec: %w", err)
	}

	validator := middleware.OapiRequestValidatorWithOptions(spec,
		&middleware.Options{
			Options: openapi3filter.Options{
				AuthenticationFunc: a.GetAuthenticator(),
			},
		})

	return validator, nil
}

// CreateUser converts echo context to params.
func (w *Handlers) CreateUser(ctx echo.Context) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

func (w *Handlers) GetSelfUser(ctx echo.Context) error {
	tokenBearer, err := auth.GetTokenObjectFromRequest(ctx.Request())
	if err != nil {
		return err
	}

	user, err := w.repository.GetUser(tokenBearer.Username)
	if err != nil {
		return err
	}

	//Mapping returned Object
	var returnedUser User
	returnedUser.Id = &user.Id
	returnedUser.Username = &user.Login
	//TODO: auto parse token generate returned logintokens
	//returnedUser.Tokens = user.Tokens

	ctx.JSON(http.StatusOK, returnedUser)

	return nil
}

func (w *Handlers) GetSelfProtocolList(ctx echo.Context) error {
	tokenBearer, err := auth.GetTokenObjectFromRequest(ctx.Request())
	if err != nil {
		return err
	}

	protocols, err := w.repository.GetUserProtocols(tokenBearer.Username)
	if err != nil {
		return err
	}
	spew.Dump(protocols)

	//Mapping returned Object
	//Attempt at automatic mapping
	var returnedProtocols UserProtocolsList
	bytes, _ := json.Marshal(protocols)
	//TODO: properly handle error
	json.Unmarshal(bytes, &returnedProtocols.Protocols)
	//returnedProtocols.Protocols = make([]ShortProtocol, len(protocols))
	//automapper.Map(protocols, &returnedProtocols.Protocols)

	//returnedUser.Id = &user.Id
	//returnedUser.Username = &user.Login
	//TODO: auto parse token generate returned logintokens
	//returnedUser.Tokens = user.Tokens

	ctx.JSON(http.StatusOK, returnedProtocols)

	return nil
}

// LoginUser converts echo context to params.
func (w *Handlers) LoginUser(ctx echo.Context) error {
	var loginParams LoginParams
	err := ctx.Bind(&loginParams)
	if err != nil {
		return err
	}
	generatedToken, err := w.auth.NewAccessToken(*loginParams.Username, *loginParams.Password)
	if err != nil {
		spew.Dump(err)
		ctx.NoContent(http.StatusUnauthorized)
		return err
	}

	//Mapping returned object
	var returnedToken LoginToken
	returnedToken.Token = &generatedToken.Token
	returnedDateStr := (&generatedToken.ExpirationDate).String()
	returnedToken.ExpirationDate = &returnedDateStr

	ctx.JSON(http.StatusCreated, returnedToken)
	return nil
}

// LogoutUser converts echo context to params.
func (w *Handlers) LogoutUser(ctx echo.Context) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

// DeleteUser converts echo context to params.
func (w *Handlers) DeleteUser(ctx echo.Context, username string) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

// GetUserByName converts echo context to params.
func (w *Handlers) GetUserByName(ctx echo.Context, username string) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

// UpdateUser converts echo context to params.
func (w *Handlers) UpdateUser(ctx echo.Context, username string) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

func (w *Handlers) ServeSwaggerFile(ctx echo.Context) error {
	swagger, _ := GetSwagger()
	str, _ := swagger.MarshalJSON()
	ctx.Response().Header().Add("Content-Type", "application/json")
	ctx.Response().Write(str)
	return nil
}