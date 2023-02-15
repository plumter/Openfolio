package services

import "github.com/plumter/Openfolio/repository/models"

type service struct {
	repo models.Repository
}

func NewService(repo models.Repository) models.Service {
	return &service{
		repo,
	}
}
