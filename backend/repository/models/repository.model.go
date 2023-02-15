package models

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Repository interface {
	FindOneUser(ctx *gin.Context, filter primitive.D) (*User, error)
	CreateUser(ctx *gin.Context, data *User) (interface{}, error)
	FindOneAndUpdateUser(ctx *gin.Context, filter, data primitive.D) (interface{}, error)
}

type Service interface {
	FindOneUser(ctx *gin.Context, filter primitive.D) (*User, error)
	CreateUser(ctx *gin.Context, data *User) (interface{}, error)
	FindOneAndUpdateUser(ctx *gin.Context, filter, data primitive.D) (interface{}, error)
}
