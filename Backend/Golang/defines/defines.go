package defines

import (
	"encoding/json"
	"errors"
	"time"
)

type SimpleReturnMessage struct {
	Message string `json:"message,omitempty"`
}

type LoginToken struct {
	ExpirationDate time.Time `json:"expiration_date,omitempty"`
	Token          string    `json:"token,omitempty"`
}

type AuthToken struct {
	Username string `json:"u"`
	Token    string `json:"t"`
}

// User defines model for User.
type User struct {
	Id       int64  `json:"id,omitempty"`
	Password string `json:"password,omitempty"`
	Login    string `json:"username,omitempty"`
	Email    string `json:"email,omitempty"`
	Tokens   []LoginToken
}

// Electrode defines model for Electrode.
type Electrode struct {
	ElectrodeId string `json:"electrode_id,omitempty"`
	Value       int    `json:"value,omitempty"`
}

// Frame defines model for Frame.
type Frame struct {
	Duration   int         `json:"duration,omitempty"`
	Electrodes []Electrode `json:"electrodes,omitempty"`
	Rank       int         `json:"rank,omitempty"`
}

// RankedAuthor defines model for RankedAuthor.
type RankedAuthor struct {
	Author string `json:"author,omitempty"`
	Rank   int    `json:"rank,omitempty"`
}

// ShortProtocol defines model for ShortProtocol.
type ShortProtocol struct {
	AuthorList    []RankedAuthor `json:"author_list"`
	AuthorRank    int            `json:"author_rank"`
	FrameCount    int            `json:"frame_count"`
	Id            int            `json:"id"`
	MaskFrame     []Frame        `json:"mask_frame"`
	Name          string         `json:"name"`
	TotalDuration int            `json:"total_duration"`
}

// bytesUnmarshall is used to make objets implement the Scan interface to decode json from database into proper objects.
func bytesUnmarshall(destination interface{}, value interface{}) error {
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}

	return json.Unmarshal(b, &destination)
}

// Make the Attrs struct implement the sql.Scanner interface. This method
// simply decodes a JSON-encoded value into the struct fields.
func (a *User) Scan(value interface{}) error {
	return bytesUnmarshall(&a, value)
}

func (sp *ShortProtocol) Scan(value interface{}) error {
	return bytesUnmarshall(&sp, value)
}
