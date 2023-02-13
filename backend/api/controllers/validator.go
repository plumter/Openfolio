package controllers

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/plumter/Openfolio/pkg"
)

var (
	InternalError = errors.New("something went wrong, please try again later")
)

func matchErrorToMsg(e validator.FieldError) string {
	switch e.Tag() {
	case "required":
		return fmt.Sprintf("%s is required ", strings.ToLower(e.Field()))
	}

	return fmt.Sprintf("%s is not valid", e.Field())
}

func MatchError(err error, ctx *gin.Context) {
	for _, fieldErr := range err.(validator.ValidationErrors) {
		ctx.JSON(http.StatusBadRequest, pkg.ErrorResponse(matchErrorToMsg(fieldErr)))
		return
	}
}
