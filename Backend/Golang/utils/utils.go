package utils

import (
	"crypto/rand"
	"fmt"
)

func TokenGenerator(length int) string {
	b := make([]byte, length)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}
