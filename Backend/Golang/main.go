package main

import (
	"fmt"
	"log"

	"github.com/DigitalBiologyPlatform/Backend/auth"
	"github.com/DigitalBiologyPlatform/Backend/repository"
	server "github.com/DigitalBiologyPlatform/Backend/server"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"
)

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
	if err != nil {
		log.Fatal(err)
	}

	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.Logger())
	e.Use(middleware.BasicAuth(auth.BasicAuthValidator))

	serverHandlers := server.NewHandlers(repo)
	server.RegisterHandlers(e, serverHandlers)

	fmt.Printf("PORT:")
	fmt.Println(viper.Get("PORT"))

	e.Logger.Fatal(e.Start(viper.GetString("SERVER_HOST") + ":" + viper.GetString("SERVER_PORT")))
}
