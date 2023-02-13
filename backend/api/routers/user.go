package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/plumter/Openfolio/api/controllers"
	"github.com/plumter/Openfolio/api/middlewares"
	"github.com/plumter/Openfolio/pkg"
	"github.com/plumter/Openfolio/repository/models"
	"github.com/plumter/Openfolio/token"
)

type UserRouteConfig struct {
	TokenMaker token.Maker
	Service    models.Service
	Config     *pkg.Configurations
	Router     *gin.Engine
}

func UserRoutes(routeConfig *UserRouteConfig) {

	userController := &controllers.UserController{
		TokenMaker: routeConfig.TokenMaker, Config: routeConfig.Config, Service: routeConfig.Service,
	}

	v1 := routeConfig.Router.Group("v1")
	{
		userGroup := v1.Group("user")
		{
			userGroup.POST("/signin", userController.SignIn)

			userAuthGroup := userGroup.Group("profile").Use(middlewares.AuthMiddleware(routeConfig.TokenMaker, routeConfig.Service))
			{
				userAuthGroup.GET("/", userController.Welcome)
				userAuthGroup.PATCH("/", userController.UpdateProfile)
			}
		}

		// userAuthGroup := v1.Group("user").Use(middlewares.AuthMiddleware(routeConfig.TokenMaker, routeConfig.Service))
		// {
		// 	userAuthGroup.GET("/welcome", userController.Welcome)
		// }
	}
}
