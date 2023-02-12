package token

import "time"

// Maker inteface is for managing tokens, it's a blueprint for implementing any token (JWT, Paseto etc)
type Maker interface {
	CreateToken(email string, duration time.Duration) (string, error)

	VerifyToken(token string) (*Payload, error)
}
