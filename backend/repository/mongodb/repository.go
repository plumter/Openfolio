package mongodb

import (
	"context"

	"github.com/pkg/errors"
	"github.com/plumter/Openfolio/repository/models"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type mongoRepository struct {
	client   *mongo.Client
	database string
}

func newMongoClient(mongoURL string) (*mongo.Client, error) {
	ctx := context.TODO()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		return nil, err
	}
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		return nil, err
	}
	return client, nil
}

func NewMongoRepository(mongoURL, databaseName string) (models.Repository, error) {
	repo := &mongoRepository{
		database: databaseName,
	}
	client, err := newMongoClient(mongoURL)
	if err != nil {
		return nil, errors.Wrap(err, "repository.NewMongoRepo")
	}
	repo.client = client
	return repo, nil
}
