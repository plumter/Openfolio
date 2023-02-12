package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID             primitive.ObjectID `json:"_id" bson:"_id"`
	Email          string             `json:"email" bson:"email"`
	Name           string             `json:"name" bson:"name"`
	CompanyName    string             `json:"companyName" bson:"companyName"`
	CompanyAddress string             `json:"companyAddress" bson:"companyAddress"`
	Position       string             `json:"position" bson:"position"`
	Website        string             `json:"website" bson:"website"`
	Phone          string             `json:"phone" bson:"phone"`
	Token          string             `json:"token" bson:"token"`
	CreatedAt      primitive.DateTime `json:"createdAt" bson:"createdAt"`
	UpdatedAt      primitive.DateTime `json:"updatedAt" bson:"updatedAt"`
}
