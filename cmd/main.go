package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"github.com/Unlites/english_learning_web_app/pkg/repository"
	"github.com/Unlites/english_learning_web_app/pkg/service"
	"github.com/spf13/viper"

	"github.com/Unlites/english_learning_web_app/pkg/handler"
	"github.com/Unlites/english_learning_web_app/pkg/server"
)

func main() {
	// Init confings, db and services. Start server.
	if err := initConfig(); err != nil {
		log.Fatalf("Falied to read config: %s", err.Error())
	}

	if err := godotenv.Load(); err != nil {
		log.Fatalf("Failed to get environment variables: %s", err.Error())
	}

	db, err := repository.NewPostgresDB(repository.Config{
		Host:     viper.GetString("db.host"),
		Port:     viper.GetString("db.port"),
		Username: viper.GetString("db.username"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   viper.GetString("db.name"),
		SSLMode:  viper.GetString("db.sslmode"),
	})

	if err != nil {
		log.Fatalf("Failed to create database: %s", err.Error())
	}

	repo := repository.NewRepository(db)
	services := service.NewService(repo)
	handlers := handler.NewHandler(services)
	srv := new(server.Server)
	if err := srv.Run(viper.GetString("port"), handlers.InitRoutes()); err != nil {
		log.Fatalf("Failed to run server: %s", err.Error())
	}
}

func initConfig() error {
	viper.AddConfigPath("configs")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}
