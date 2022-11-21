package main

import (
	"embed"
	"log"

	"github.com/DigitalBiologyPlatform/Backend/auth"
	"github.com/DigitalBiologyPlatform/Backend/config"
	"github.com/DigitalBiologyPlatform/Backend/repository"
	server "github.com/DigitalBiologyPlatform/Backend/server"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// Embedding swaggerUI files
//
//go:embed swaggerui
var embeddedSwaggerUI embed.FS

func main() {
	//Setting config
	config.LoadConfig()

	//Creating new postgres repository
	repo, err := repository.NewPostgresRepo()
	if err != nil {
		log.Fatal(err)
	}

	//Creating new authenticator
	auth := auth.NewAuthentifier(repo)
	authMiddleWare, err := server.CreateAuthMiddleware(auth)
	if err != nil {
		log.Fatal("error creating auth middleware:", err)
	}

	//Creating echo server & attaching middleware
	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.Logger())
	e.Use(middleware.CORS())
	e.Use(authMiddleWare)

	serverHandlers := server.NewHandlers(repo, auth)
	server.RegisterHandlers(e, serverHandlers)

	//serving swaggerUI on /swaggerui
	fs := echo.MustSubFS(embeddedSwaggerUI, "swaggerui")
	e.StaticFS("/swaggerui", fs)

	//Starting the server
	e.Logger.Fatal(e.Start(config.GetConfig().GetServerHost() + ":" + config.GetConfig().GetServerPort()))
}
