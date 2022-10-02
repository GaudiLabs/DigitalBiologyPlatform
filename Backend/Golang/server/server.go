package server

import (
	//"errors"
	"net/http"

	"github.com/DigitalBiologyPlatform/Backend/repository"
	"github.com/labstack/echo/v4"
)

type Handlers struct {
	data string
}

func NewHandlers(repository repository.RepositoryInterface) *Handlers {
	return &Handlers{data: "oh"}
}

// CreateUser converts echo context to params.
func (w *Handlers) CreateUser(ctx echo.Context) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

// LoginUser converts echo context to params.
func (w *Handlers) LoginUser(ctx echo.Context, params LoginUserParams) error {
	//spew.Dump(params)
	//spew.Dump(viper.GetString("SERVER_HOST"))
	if params.Username == nil || params.Password == nil {
		ctx.String(http.StatusUnprocessableEntity, "Unable to process the request")
		//return errors.New(ctx.Response().S, ctx.Request().Response)
		return nil
	}
	if *params.Username != "uname" && *params.Password != "password" {
		ctx.String(http.StatusUnauthorized, "Unauthorized")
	}
	ctx.String(http.StatusOK, "Hello, World!")
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
