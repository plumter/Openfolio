package pkg

import (
	"time"

	"github.com/spf13/viper"
)

type Configurations struct {
	AccessTokenDuration time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
	TokenSymmetricKey   string        `mapstructure:"TOKEN_SYMMETRIC_KEY"`
	MongoDBUrl          string        `mapstructure:"MONGO_DB_URL"`
	DatabaseName        string        `mapstructure:"DATABASE_NAME"`
	ServerAddress       string        `mapstructure:"SERVER_ADDRESS"`
}

func LoadEnv(path string) (config Configurations, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("dev")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	if err = viper.ReadInConfig(); err != nil {
		return
	}
	err = viper.Unmarshal(&config)
	return
}
