package pkg

import "github.com/spf13/viper"

type Configurations struct {
}

func LoadEnv(path string) (config Configurations, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("dev")
	viper.SetConfigFile("env")

	viper.AutomaticEnv()

	if err = viper.ReadInConfig(); err != nil {
		return
	}
	err = viper.Unmarshal(&config)
	return
}
