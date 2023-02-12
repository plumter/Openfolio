package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/plumter/Openfolio/pkg"
	"github.com/plumter/Openfolio/repository/models"
	"github.com/plumter/Openfolio/token"
	"go.mongodb.org/mongo-driver/bson"
)

type UserController struct {
	Service    models.Service
	Config     *pkg.Configurations
	TokenMaker token.Maker
}

type signInParam struct {
	Email string `json:"email"`
}

func (u *UserController) SignIn(ctx *gin.Context) {
	var body signInParam

	if err := ctx.ShouldBind(&body); err != nil {
		MatchError(err, ctx)
		return
	}

	filter := bson.D{{Key: "email", Value: body.Email}}
	user, err := u.Service.FindOneUser(ctx, filter)

	if err != nil {
		pkg.Logger(err)
		ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to check user, please try again later."))
		return
	}

	token, err := u.TokenMaker.CreateToken(body.Email, u.Config.AccessTokenDuration)

	if err != nil {
		pkg.Logger(err)
		ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to generate token at this time, please try again later."))
		return
	}

	if user == nil {
		// create user
		data := &models.User{
			Email: body.Email,
			Token: token,
		}

		_, err := u.Service.CreateUser(ctx, data)

		if err != nil {
			pkg.Logger(err)
			ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to create user, please try again later."))
			return
		}
	}

	ctx.JSON(http.StatusOK, pkg.SuccessResponse("Ok", token))
	return
}
