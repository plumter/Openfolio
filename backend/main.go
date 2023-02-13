package main

import (
	"log"

	"github.com/plumter/Openfolio/api"
	"github.com/plumter/Openfolio/pkg"
	"github.com/plumter/Openfolio/repository/mongodb"
	"github.com/plumter/Openfolio/repository/services"
)

func main() {
	config, err := pkg.LoadEnv(".")
	if err != nil {
		log.Fatal("cannot load env variables: ", err)
	}

	mongoClient, err := mongodb.NewMongoRepository(config.MongoDBUrl, config.DatabaseName)
	if err != nil {
		log.Fatal(err)
	}

	store := services.NewService(mongoClient)

	router, err := api.NewServer(config, store)

	if err != nil {
		log.Fatal("cannot create server: ", err)
	}

	router.Run(config.ServerAddress)

	if err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}
