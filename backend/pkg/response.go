package pkg

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func Logger(err error) {
	fmt.Fprintln(os.Stdout, "error occurred: ", err)
}

func ErrorResponse(msg string) *gin.H {
	return &gin.H{"error": msg}
}

func SuccessResponse(msg string, data interface{}) *gin.H {
	return &gin.H{"message": msg, "data": data}
}
