package main

import (
	"embed"
	"log"

	"github.com/DigitalBiologyPlatform/Backend/auth"
	"github.com/DigitalBiologyPlatform/Backend/repository"
	server "github.com/DigitalBiologyPlatform/Backend/server"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"
)

// Embedding swaggerUI files
//
//go:embed swaggerui
var embeddedSwaggerUI embed.FS

func main() {
	//Setting config (viper)
	viper.AutomaticEnv()
	viper.SetConfigFile(".env")
	viper.ReadInConfig()

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
	e.Use(authMiddleWare)
	//e.Use(middleware.BasicAuth(auth.BasicAuthValidator))

	serverHandlers := server.NewHandlers(repo, auth)
	server.RegisterHandlers(e, serverHandlers)

	//serving swaggerUI on /swaggerui
	fs := echo.MustSubFS(embeddedSwaggerUI, "swaggerui")
	e.StaticFS("/swaggerui", fs)

	//Starting the server
	e.Logger.Fatal(e.Start(viper.GetString("SERVER_HOST") + ":" + viper.GetString("SERVER_PORT")))
}
