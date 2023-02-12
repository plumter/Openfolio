package services

import (
	"github.com/gin-gonic/gin"
	"github.com/plumter/Openfolio/repository/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *service) FindOneUser(ctx *gin.Context, filter primitive.D) (*models.User, error) {
	return s.repo.FindOneUser(ctx, filter)
}

func (s *service) CreateUser(ctx *gin.Context, data *models.User) (interface{}, error) {
	return s.repo.CreateUser(ctx, data)
}
func (s *service) FindOneAndUpdateUser(ctx *gin.Context, filter, data primitive.D) (interface{}, error) {
	return s.repo.FindOneAndUpdateUser(ctx, filter, data)
}
