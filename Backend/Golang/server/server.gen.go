// Package server provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen version v1.11.0 DO NOT EDIT.
package server

import (
	"bytes"
	"compress/gzip"
	"encoding/base64"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"

	"github.com/deepmap/oapi-codegen/pkg/runtime"
	"github.com/getkin/kin-openapi/openapi3"
	"github.com/labstack/echo/v4"
)

const (
	BearerAuthScopes = "BearerAuth.Scopes"
)

// CreateUserParams defines model for CreateUserParams.
type CreateUserParams struct {
	Email    *string `json:"email,omitempty"`
	Password *string `json:"password,omitempty"`
	Username *string `json:"username,omitempty"`
}

// Electrode defines model for Electrode.
type Electrode struct {
	ElectrodeId string  `json:"electrode_id"`
	Value       float32 `json:"value"`
}

// Frame defines model for Frame.
type Frame struct {
	Duration   float32     `json:"duration"`
	Electrodes []Electrode `json:"electrodes"`
	Rank       float32     `json:"rank"`
}

// LoginParams defines model for LoginParams.
type LoginParams struct {
	Password *string `json:"password,omitempty"`
	Username *string `json:"username,omitempty"`
}

// LoginToken defines model for LoginToken.
type LoginToken struct {
	ExpirationDate *string `json:"expiration_date,omitempty"`
	Token          *string `json:"token,omitempty"`
}

// RankedAuthor defines model for RankedAuthor.
type RankedAuthor struct {
	Author string  `json:"author"`
	Rank   float32 `json:"rank"`
}

// ShortProtocol defines model for ShortProtocol.
type ShortProtocol struct {
	AuthorList    []RankedAuthor `json:"author_list"`
	AuthorRank    float32        `json:"author_rank"`
	FrameCount    float32        `json:"frame_count"`
	Id            float32        `json:"id"`
	MaskFrame     []Frame        `json:"mask_frame"`
	Name          string         `json:"name"`
	TotalDuration float32        `json:"total_duration"`
}

// User defines model for User.
type User struct {
	Email    *string       `json:"email,omitempty"`
	Id       *int64        `json:"id,omitempty"`
	Tokens   *[]LoginToken `json:"tokens,omitempty"`
	Username *string       `json:"username,omitempty"`
}

// UserProtocolsList defines model for UserProtocolsList.
type UserProtocolsList struct {
	Protocols []ShortProtocol `json:"protocols"`
}

// CreateUserJSONBody defines parameters for CreateUser.
type CreateUserJSONBody = CreateUserParams

// LoginUserJSONBody defines parameters for LoginUser.
type LoginUserJSONBody = LoginParams

// UpdateUserJSONBody defines parameters for UpdateUser.
type UpdateUserJSONBody = User

// CreateUserJSONRequestBody defines body for CreateUser for application/json ContentType.
type CreateUserJSONRequestBody = CreateUserJSONBody

// LoginUserJSONRequestBody defines body for LoginUser for application/json ContentType.
type LoginUserJSONRequestBody = LoginUserJSONBody

// UpdateUserJSONRequestBody defines body for UpdateUser for application/json ContentType.
type UpdateUserJSONRequestBody = UpdateUserJSONBody

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// Get token bearer protocols list
	// (GET /protocol/me)
	GetSelfProtocolList(ctx echo.Context) error
	// Serve a json file representing this swaggerfile
	// (GET /swagger.json)
	ServeSwaggerFile(ctx echo.Context) error
	// Create user
	// (POST /user)
	CreateUser(ctx echo.Context) error
	// Logs user into the system
	// (POST /user/login)
	LoginUser(ctx echo.Context) error
	// Get user infos of token bearer
	// (GET /user/me)
	GetSelfUser(ctx echo.Context) error
	// Delete user
	// (DELETE /user/{username})
	DeleteUser(ctx echo.Context, username string) error
	// Get user by user name
	// (GET /user/{username})
	GetUserByName(ctx echo.Context, username string) error
	// Update user
	// (PUT /user/{username})
	UpdateUser(ctx echo.Context, username string) error
}

// ServerInterfaceWrapper converts echo contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler ServerInterface
}

// GetSelfProtocolList converts echo context to params.
func (w *ServerInterfaceWrapper) GetSelfProtocolList(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetSelfProtocolList(ctx)
	return err
}

// ServeSwaggerFile converts echo context to params.
func (w *ServerInterfaceWrapper) ServeSwaggerFile(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.ServeSwaggerFile(ctx)
	return err
}

// CreateUser converts echo context to params.
func (w *ServerInterfaceWrapper) CreateUser(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.CreateUser(ctx)
	return err
}

// LoginUser converts echo context to params.
func (w *ServerInterfaceWrapper) LoginUser(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.LoginUser(ctx)
	return err
}

// GetSelfUser converts echo context to params.
func (w *ServerInterfaceWrapper) GetSelfUser(ctx echo.Context) error {
	var err error

	ctx.Set(BearerAuthScopes, []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetSelfUser(ctx)
	return err
}

// DeleteUser converts echo context to params.
func (w *ServerInterfaceWrapper) DeleteUser(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "username" -------------
	var username string

	err = runtime.BindStyledParameterWithLocation("simple", false, "username", runtime.ParamLocationPath, ctx.Param("username"), &username)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter username: %s", err))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.DeleteUser(ctx, username)
	return err
}

// GetUserByName converts echo context to params.
func (w *ServerInterfaceWrapper) GetUserByName(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "username" -------------
	var username string

	err = runtime.BindStyledParameterWithLocation("simple", false, "username", runtime.ParamLocationPath, ctx.Param("username"), &username)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter username: %s", err))
	}

	ctx.Set(BearerAuthScopes, []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetUserByName(ctx, username)
	return err
}

// UpdateUser converts echo context to params.
func (w *ServerInterfaceWrapper) UpdateUser(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "username" -------------
	var username string

	err = runtime.BindStyledParameterWithLocation("simple", false, "username", runtime.ParamLocationPath, ctx.Param("username"), &username)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter username: %s", err))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.UpdateUser(ctx, username)
	return err
}

// This is a simple interface which specifies echo.Route addition functions which
// are present on both echo.Echo and echo.Group, since we want to allow using
// either of them for path registration
type EchoRouter interface {
	CONNECT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	DELETE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	HEAD(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	OPTIONS(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PATCH(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	POST(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PUT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	TRACE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
}

// RegisterHandlers adds each server route to the EchoRouter.
func RegisterHandlers(router EchoRouter, si ServerInterface) {
	RegisterHandlersWithBaseURL(router, si, "")
}

// Registers handlers, and prepends BaseURL to the paths, so that the paths
// can be served under a prefix.
func RegisterHandlersWithBaseURL(router EchoRouter, si ServerInterface, baseURL string) {

	wrapper := ServerInterfaceWrapper{
		Handler: si,
	}

	router.GET(baseURL+"/protocol/me", wrapper.GetSelfProtocolList)
	router.GET(baseURL+"/swagger.json", wrapper.ServeSwaggerFile)
	router.POST(baseURL+"/user", wrapper.CreateUser)
	router.POST(baseURL+"/user/login", wrapper.LoginUser)
	router.GET(baseURL+"/user/me", wrapper.GetSelfUser)
	router.DELETE(baseURL+"/user/:username", wrapper.DeleteUser)
	router.GET(baseURL+"/user/:username", wrapper.GetUserByName)
	router.PUT(baseURL+"/user/:username", wrapper.UpdateUser)

}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"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",
	"GAAA",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %s", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %s", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %s", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	var res = make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	var resolvePath = PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		var pathToFile = url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}
