package defines

import (
	"time"

	"github.com/DigitalBiologyPlatform/Backend/utils"
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
	Id                   int64  `json:"id,omitempty"`
	Password             string `json:"password,omitempty"`
	Login                string `json:"username,omitempty"`
	Email                string `json:"email,omitempty"`
	Fullname             string `json:"fullname,omitempty"`
	Bio                  string `json:"bio,omitempty"`
	Website              string `json:"website,omitempty"`
	Institution          string `json:"institution,omitempty"`
	PublicProtocolAmount int    `json:"public_protocol_amount"`
	ProtocolAmount       int    `json:"protocol_amount"`
	Tokens               []LoginToken
}

// Electrode defines model for Electrode.
type Electrode struct {
	ElectrodeId string `json:"electrode_id,omitempty"`
	Value       int    `json:"value,omitempty"`
}

// Frame defines model for Frame.
type Frame struct {
	Duration     int                   `json:"duration,omitempty"`
	Electrodes   []Electrode           `json:"electrodes,omitempty"`
	Rank         int                   `json:"rank,omitempty"`
	Magnets      *[]IndexedMagnet      `json:"magnets,omitempty"`
	Temperatures *[]IndexedTemperature `json:"temperatures,omitempty"`
}

// IndexedMagnet defines model for IndexedMagnet.
type IndexedMagnet struct {
	Index int  `json:"index"`
	Value bool `json:"value"`
}

// IndexedTemperature defines model for IndexedTemperature.
type IndexedTemperature struct {
	Index int     `json:"index"`
	Value float32 `json:"value"`
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
	Description   string         `json:"description"`
	TotalDuration int            `json:"total_duration"`
	DeviceID      int            `json:"device_id"`
	Public        bool           `json:"public"`
}

// ShortProtocol defines model for ShortProtocol.
type FullProtocol struct {
	AuthorList    []RankedAuthor `json:"author_list"`
	FrameCount    int            `json:"frame_count"`
	Id            int            `json:"id"`
	Frames        []Frame        `json:"frames"`
	Name          string         `json:"name"`
	Description   string         `json:"description"`
	TotalDuration int            `json:"total_duration"`
	DeviceID      int            `json:"device_id"`
	MaskFrame     Frame          `json:"mask_frame"`
	Public        bool           `json:"public"`
}

type Device struct {
	ID         int      `json:"id"`
	Electrodes []string `json:"electrodes"`
	SVG        string   `json:"svg"`
	Name       string   `json:"name"`
}

func (fp *FullProtocol) AuthoredBy(username string) bool {
	for _, author := range fp.AuthorList {
		if author.Author == username {
			return true
		}
	}
	return false
}

// Make the Attrs struct implement the sql.Scanner interface. This method
// simply decodes a JSON-encoded value into the struct fields.
func (a *User) Scan(value interface{}) error {
	return utils.BytesUnmarshall(&a, value)
}

func (sp *ShortProtocol) Scan(value interface{}) error {
	return utils.BytesUnmarshall(&sp, value)
}

func (sp *FullProtocol) Scan(value interface{}) error {
	return utils.BytesUnmarshall(&sp, value)
}

func (d *Device) Scan(value interface{}) error {
	return utils.BytesUnmarshall(&d, value)
}
