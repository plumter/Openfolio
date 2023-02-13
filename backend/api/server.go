package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/plumter/Openfolio/api/routers"
	"github.com/plumter/Openfolio/pkg"
	"github.com/plumter/Openfolio/repository/models"
	"github.com/plumter/Openfolio/token"
)

type Server struct {
	router *gin.Engine
}

func NewServer(config pkg.Configurations, service models.Service) (*gin.Engine, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)

	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %e ", err)
	}
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	organizationConfig := &routers.UserRouteConfig{
		TokenMaker: tokenMaker,
		Service:    service,
		Config:     &config,
		Router:     router,
	}
	routers.UserRoutes(organizationConfig)

	return router, nil
}
