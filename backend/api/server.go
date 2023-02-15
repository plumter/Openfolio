package api

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
	"strings"

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
	router.SetFuncMap(template.FuncMap{
		"upper": strings.ToUpper,
	})
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	router.Static("/assets", "./assets")

	pwd, _ := os.Getwd()
	router.LoadHTMLGlob(pwd + "/api/public/**/*.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	organizationConfig := &routers.UserRouteConfig{
		TokenMaker: tokenMaker,
		Service:    service,
		Config:     &config,
		Router:     router,
	}
	routers.UserRoutes(organizationConfig)

	return router, nil
}
