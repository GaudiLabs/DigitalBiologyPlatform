package repository

type LoginToken struct {
	ExpirationDate *string `json:"expiration_date,omitempty"`
	Token          *string `json:"token,omitempty"`
	Username       *string `json:"username,omitempty"`
}

// User defines model for User.
type User struct {
	Email    *string `json:"email,omitempty"`
	Id       *int64  `json:"id,omitempty"`
	Password *string `json:"password,omitempty"`

	// User Status
	UserStatus *int32  `json:"userStatus,omitempty"`
	Username   *string `json:"username,omitempty"`
}

type RepositoryInterface interface {
	CreateUser(User) error
	StoreTokenForUser(LoginToken) error
}
