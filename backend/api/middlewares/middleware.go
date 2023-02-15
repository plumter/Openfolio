package middlewares

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/plumter/Openfolio/pkg"
	"github.com/plumter/Openfolio/repository/models"
	"github.com/plumter/Openfolio/token"
	"go.mongodb.org/mongo-driver/bson"
)

func AuthMiddleware(tokenMaker token.Maker, service models.Service) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authorizationHeader := ctx.GetHeader("authorization")

		if len(authorizationHeader) == 0 {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, pkg.ErrorResponse("Authorization header was not provided"))
			return
		}

		headerArr := strings.Split(authorizationHeader, " ")

		if len(headerArr) < 2 {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, pkg.ErrorResponse("Authorization header was not provided"))
			return
		}

		token := headerArr[1]

		// payload
		_, err := tokenMaker.VerifyToken(token)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, pkg.ErrorResponse("Invalid token"))
			return
		}

		user, err := service.FindOneUser(ctx, bson.D{{Key: "token", Value: token}})

		if user == nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, pkg.ErrorResponse("This token does not exist"))
			return
		}

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, pkg.ErrorResponse("Failed to check this token"))
			return
		}

		// user, err := service.FindOneUser(ctx, bson.D{{Key: "email", Value: payload.Email}})

		if user == nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, pkg.ErrorResponse("Invalid token"))
			return
		}

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, pkg.ErrorResponse("Invalid token"))
			return
		}

		ctx.Set("user", user)
		ctx.Next()
	}
}
