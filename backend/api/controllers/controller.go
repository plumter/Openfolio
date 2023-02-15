package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/plumter/Openfolio/pkg"
	"github.com/plumter/Openfolio/repository/models"
	"github.com/plumter/Openfolio/token"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserController struct {
	Service    models.Service
	Config     *pkg.Configurations
	TokenMaker token.Maker
}

type signInParam struct {
	Email string `json:"email" binding:"required"`
}

type signInResponseParam struct {
	Token string `json:"token"`
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
			Email:     body.Email,
			Token:     token,
			CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
			UpdatedAt: primitive.NewDateTimeFromTime(time.Now()),
		}

		_, err := u.Service.CreateUser(ctx, data)

		if err != nil {
			pkg.Logger(err)
			ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to create user, please try again later."))
			return
		}
	} else {
		filter := bson.D{{Key: "email", Value: body.Email}}
		data := bson.D{{Key: "$set", Value: bson.D{{Key: "token", Value: token}, {Key: "updated_at", Value: primitive.NewDateTimeFromTime(time.Now())}}}}

		_, err := u.Service.FindOneAndUpdateUser(ctx, filter, data)

		if err != nil {
			pkg.Logger(err)
			ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to update user, please try again later."))
			return
		}
	}

	resp := &signInResponseParam{
		Token: token,
	}

	ctx.JSON(http.StatusOK, pkg.SuccessResponse(fmt.Sprintf("An email has been sent to %v, please click the link to continue", body.Email), resp))
	return
}

func (u *UserController) Profile(ctx *gin.Context) {
	userStr, ok := ctx.Get("user")

	if !ok {
		ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to get user"))
		return
	}

	user := userStr.(*models.User)

	ctx.JSON(http.StatusOK, pkg.SuccessResponse("Ok", user))
	return
}

type profileParams struct {
	Name           string `json:"name" binding:"required"`
	CompanyName    string `json:"companyName" binding:"required"`
	CompanyAddress string `json:"companyAddress" binding:"required"`
	Position       string `json:"position" binding:"required"`
	Website        string `json:"website" binding:"required"`
	Phone          string `json:"phone" binding:"required"`
}

func (u *UserController) UpdateProfile(ctx *gin.Context) {
	var body profileParams

	if err := ctx.ShouldBind(&body); err != nil {
		MatchError(err, ctx)
		return
	}

	userStr, ok := ctx.Get("user")

	if !ok {
		ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to get user"))
		return
	}

	user := userStr.(*models.User)

	data := bson.D{
		{Key: "name", Value: body.Name},
		{Key: "companyName", Value: body.CompanyName},
		{Key: "companyAddress", Value: body.CompanyAddress},
		{Key: "position", Value: body.Position},
		{Key: "website", Value: body.Website},
		{Key: "phone", Value: body.Phone},
	}

	_, err := u.Service.FindOneAndUpdateUser(ctx, bson.D{{Key: "email", Value: user.Email}}, bson.D{{Key: "$set", Value: data}})

	if err != nil {
		ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to update user, please try again later"))
		return
	}

	ctx.JSON(http.StatusOK, pkg.SuccessResponse("You have updated your account", nil))
	return
}

type publicProfile struct {
	Email          string `json:"email" bson:"email"`
	Name           string `json:"name" bson:"name"`
	CompanyName    string `json:"companyName" bson:"companyName"`
	CompanyAddress string `json:"companyAddress" bson:"companyAddress"`
	Position       string `json:"position" bson:"position"`
	Website        string `json:"website" bson:"website"`
	Phone          string `json:"phone" bson:"phone"`
}

func (u *UserController) PublicProfile(ctx *gin.Context) {
	id, ok := ctx.Params.Get("id")

	if !ok {
		ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("Failed to get id"))
		return
	}

	idHex, _ := primitive.ObjectIDFromHex(id)

	filter := bson.D{{Key: "_id", Value: idHex}}
	user, err := u.Service.FindOneUser(ctx, filter)

	if err != nil || user == nil {
		ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse("User does not exist"))
		return
	}

	publicUser := publicProfile{
		Email:          user.Email,
		Name:           user.Name,
		CompanyName:    user.CompanyName,
		CompanyAddress: user.CompanyAddress,
		Position:       user.Position,
		Website:        user.Website,
		Phone:          user.Phone,
	}

	ctx.JSON(http.StatusOK, pkg.SuccessResponse("Ok", publicUser))
	return
}
