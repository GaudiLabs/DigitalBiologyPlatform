package main

import (
	"os"

	server "github.com/DigitalBiologyPlatform/Backend/server"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Set up echo server/router and middleware.
	// The paths in out OpenAPI spec are defined w/o trailing slashes, but we want
	// to accept requests *with* trailing slashes too - so use the
	// RemoveTrailingSlash middleware.
	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.Logger())

	serverHandlers := server.NewHandlers()
	server.RegisterHandlers(e, serverHandlers)

	e.Logger.Fatal(e.Start("localhost:" + os.Getenv("SERVERPORT")))
}
