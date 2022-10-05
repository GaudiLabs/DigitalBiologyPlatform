package server

import (
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
	returnedToken.Username = loginParams.Username

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
