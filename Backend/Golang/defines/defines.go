package defines

import (
	"encoding/json"
	"errors"
	"time"

	"github.com/davecgh/go-spew/spew"
)

type LoginToken struct {
	ExpirationDate time.Time `json:"expiration_date,omitempty"`
	Token          string    `json:"token,omitempty"`
}

// User defines model for User.
type User struct {
	Id       int64  `json:"id,omitempty"`
	Password string `json:"password,omitempty"`
	Login    string `json:"login,omitempty"`
	Tokens   []LoginToken
}

// Make the Attrs struct implement the sql.Scanner interface. This method
// simply decodes a JSON-encoded value into the struct fields.
func (a *User) Scan(value interface{}) error {
	spew.Dump(value)
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}

	return json.Unmarshal(b, &a)
}
