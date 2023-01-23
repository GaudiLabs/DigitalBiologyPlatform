package utils

import (
	"crypto/rand"
	"encoding/json"
	"errors"
	"fmt"
)

func TokenGenerator(length int) string {
	b := make([]byte, length)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

func BoolToInt(mybool bool) int8 {
	if mybool {
		return 1
	}
	return 0
}

func IntToBool(myint int) bool {
	if myint != 0 {
		return true
	}
	return false
}

// BytesUnmarshall is used to make objets implement the Scan interface to decode json from database into proper objects.
func BytesUnmarshall(destination interface{}, value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}

	return json.Unmarshal(b, &destination)
}
