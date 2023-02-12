package mongodb

import (
	"github.com/gin-gonic/gin"
	"github.com/plumter/Openfolio/repository/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	userCollection = "users"
)

func (m *mongoRepository) FindOneUser(ctx *gin.Context, filter primitive.D) (*models.User, error) {
	collection := m.client.Database(m.database).Collection(userCollection)

	var result *models.User

	err := collection.FindOne(ctx, filter).Decode(&result)

	if err == mongo.ErrNilDocument {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (m *mongoRepository) CreateUser(ctx *gin.Context, data *models.User) (interface{}, error) {
	collection := m.client.Database(m.database).Collection(userCollection)

	result, err := collection.InsertOne(ctx, data)

	if err != nil {
		return nil, err
	}

	return result.InsertedID, nil
}

func (m *mongoRepository) FindOneAndUpdateUser(ctx *gin.Context, filter, data primitive.D) (interface{}, error) {
	collection := m.client.Database(m.database).Collection(userCollection)

	var result *models.User

	err := collection.FindOneAndUpdate(ctx, filter, data).Decode(&result)

	if err == mongo.ErrNilDocument {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return result, nil
}
