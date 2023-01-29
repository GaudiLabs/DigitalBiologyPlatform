package server

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"net/mail"
	"time"

	"github.com/DigitalBiologyPlatform/Backend/auth"
	"github.com/DigitalBiologyPlatform/Backend/config"
	"github.com/DigitalBiologyPlatform/Backend/defines"
	"github.com/DigitalBiologyPlatform/Backend/repository"
	"github.com/davecgh/go-spew/spew"
	"github.com/deepmap/oapi-codegen/pkg/middleware"
	"github.com/getkin/kin-openapi/openapi3filter"
	"github.com/labstack/echo/v4"
)

type Handlers struct {
	repository repository.RepositoryInterface
	auth       auth.AuthInterface
	data       string
}

// Ensure server interface is implemented
var _ ServerInterface = (*Handlers)(nil)

func NewHandlers(repository repository.RepositoryInterface, auth auth.AuthInterface) *Handlers {
	return &Handlers{
		repository: repository,
		auth:       auth,
		data:       "oh",
	}
}

func CreateAuthMiddleware(a auth.AuthInterface) (echo.MiddlewareFunc, error) {
	spec, err := GetSwagger()
	if err != nil {
		return nil, fmt.Errorf("loading spec: %w", err)
	}

	validator := middleware.OapiRequestValidatorWithOptions(spec,
		&middleware.Options{
			Options: openapi3filter.Options{
				AuthenticationFunc: a.GetAuthenticator(),
			},
		})

	return validator, nil
}

// CreateUser converts echo context to params.
func (w *Handlers) CreateUser(ctx echo.Context) error {

	//Binding params
	var receivedUser CreateUserParams
	err := ctx.Bind(&receivedUser)
	if err != nil {
		return err
	}

	//DEBUG
	spew.Dump(receivedUser)

	//Verifying Captcha
	err = w.auth.VerifyHCaptcha(receivedUser.CaptchaToken)
	if err != nil {
		spew.Dump(err)
		ctx.NoContent(http.StatusUnprocessableEntity)
		return err
	}

	//Handle user already exists case
	_, err = w.repository.GetUser(receivedUser.Username)
	if err == nil {
		ctx.JSON(http.StatusConflict, defines.SimpleReturnMessage{Message: "Username already exists"})
		return nil
	}

	//Handle empty username case
	if receivedUser.Username == "" {
		ctx.JSON(http.StatusBadRequest, defines.SimpleReturnMessage{Message: "Username cannot be empty"})
		return nil
	}

	//Handle empty password case
	if receivedUser.Password == "" {
		ctx.JSON(http.StatusBadRequest, defines.SimpleReturnMessage{Message: "Password cannot be empty"})
		return nil
	}

	//Handle bad mail address case
	_, err = mail.ParseAddress(receivedUser.Email)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, defines.SimpleReturnMessage{Message: "Provided email is invalid"})
		return nil
	}

	//Mappping received object to application object
	bytes, _ := json.Marshal(receivedUser)
	//TODO: properly handle error
	var userToCreate defines.User
	json.Unmarshal(bytes, &userToCreate)
	spew.Dump(userToCreate)

	//Effictively create the user
	err = w.repository.CreateUser(userToCreate)
	if err != nil {
		return err
	}

	//Status OK
	ctx.NoContent(http.StatusCreated)
	return nil
}

func (w *Handlers) GetSelfUser(ctx echo.Context) error {
	tokenBearer, err := auth.GetTokenObjectFromRequest(ctx.Request())
	if err != nil {
		return err
	}

	user, err := w.repository.GetUser(tokenBearer.Username)
	if err != nil {
		return err
	}

	//Mapping returned Object
	var returnedUser User
	returnedUser.Id = &user.Id
	returnedUser.Username = &user.Login
	//TODO: auto parse token generate returned logintokens
	//returnedUser.Tokens = user.Tokens

	ctx.JSON(http.StatusOK, returnedUser)

	return nil
}

func (w *Handlers) GetSelfProtocolList(ctx echo.Context) error {
	tokenBearer, err := auth.GetTokenObjectFromRequest(ctx.Request())
	if err != nil {
		return err
	}

	protocols, err := w.repository.GetUserProtocols(tokenBearer.Username)
	if err != nil {
		return err
	}
	//spew.Dump(protocols)

	//Mapping returned Object
	//Attempt at automatic mapping
	var returnedProtocols ShortProtocolsList
	bytes, _ := json.Marshal(protocols)
	//TODO: properly handle error
	json.Unmarshal(bytes, &returnedProtocols.Protocols)
	//returnedProtocols.Protocols = make([]ShortProtocol, len(protocols))
	//automapper.Map(protocols, &returnedProtocols.Protocols)

	//returnedUser.Id = &user.Id
	//returnedUser.Username = &user.Login
	//TODO: auto parse token generate returned logintokens
	//returnedUser.Tokens = user.Tokens

	ctx.JSON(http.StatusOK, returnedProtocols)

	return nil
}

func (w *Handlers) GetPublicProtocolsList(ctx echo.Context, params GetPublicProtocolsListParams) error {
	var (
		limit  int
		offset int
	)

	if params.Limit != nil {
		limit = *params.Limit
	}
	if params.Offset != nil && *params.Offset >= 0 {
		offset = *params.Offset
	}

	if limit <= 0 {
		limit = config.GetConfig().GetDefaultPaginationLimit()
	}

	protocols, err := w.repository.GetPublicProtocols(limit, offset)
	if err != nil {
		return err
	}
	//spew.Dump(protocols)

	//Mapping returned Object
	//Attempt at automatic mapping
	var returnedProtocols ShortProtocolsList
	bytes, _ := json.Marshal(protocols)
	//TODO: properly handle error
	json.Unmarshal(bytes, &returnedProtocols.Protocols)
	//returnedProtocols.Protocols = make([]ShortProtocol, len(protocols))
	//automapper.Map(protocols, &returnedProtocols.Protocols)

	//returnedUser.Id = &user.Id
	//returnedUser.Username = &user.Login
	//TODO: auto parse token generate returned logintokens
	//returnedUser.Tokens = user.Tokens

	ctx.JSON(http.StatusOK, returnedProtocols)

	return nil
}

// LoginUser converts echo context to params.
func (w *Handlers) LoginUser(ctx echo.Context) error {
	var loginParams LoginParams
	err := ctx.Bind(&loginParams)
	if err != nil {
		return err
	}
	//DEBUG
	spew.Dump(loginParams)

	//Generating token
	generatedToken, err := w.auth.NewAccessToken(loginParams.Username, loginParams.Password)
	if err != nil {
		spew.Dump(err)
		ctx.NoContent(http.StatusUnauthorized)
		return err
	}

	//Mapping returned object
	var returnedToken LoginToken
	returnedToken.Token = &generatedToken.Token
	returnedDateStr := time.Time((generatedToken.ExpirationDate)).Format(time.RFC3339)
	returnedToken.ExpirationDate = &returnedDateStr

	ctx.JSON(http.StatusCreated, returnedToken)
	return nil
}

// LoginUser converts echo context to params.
func (w *Handlers) UploadProtocol(ctx echo.Context) error {

	tokenBearer, err := auth.GetTokenObjectFromRequest(ctx.Request())
	if err != nil {
		return err
	}

	var uploadProtocolParams UploadProtocolParams
	err = ctx.Bind(&uploadProtocolParams)
	if err != nil {
		return err
	}

	//TODO:
	//validate device_id
	//validate device_id is compatibles with all the described electrodes
	//verifiy author is who he says he is
	//multiple authors (acknowledgement of other authors nedded ?)

	//DONE:
	//generate mask frame
	//enrich received protocol with calculated total_duration
	//enrich received protocol with calculated frames_count

	var protocolToStore defines.FullProtocol
	//Auto mapping
	bytes, _ := json.Marshal(uploadProtocolParams)
	//TODO: properly handle error
	json.Unmarshal(bytes, &protocolToStore)

	spew.Dump("AFTER AUTOMAPPING:")
	spew.Dump(protocolToStore)

	//Metadate generation
	protocolToStore.MaskFrame, protocolToStore.TotalDuration, protocolToStore.FrameCount = uploadProtocolParams.GenerateMeta()

	spew.Dump("AFTER META:")
	spew.Dump(protocolToStore)
	protocolID, err := w.repository.CreateProtocol(protocolToStore, tokenBearer.Username)
	if err != nil {
		return err
	}
	spew.Dump(protocolID)

	protocol, err := w.repository.GetProtocol(protocolID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, defines.SimpleReturnMessage{Message: fmt.Sprintf("Protocol '%d' not found", protocolID)})
		}
		return err
	}
	spew.Dump(protocol)

	//Mapping returned Object
	var returnedProtocol FullProtocol
	bytes, _ = json.Marshal(protocol)
	//TODO: properly handle error
	json.Unmarshal(bytes, &returnedProtocol)

	_ = tokenBearer
	ctx.JSON(http.StatusCreated, returnedProtocol)
	return nil
}

func (w *Handlers) OverwriteProtocol(ctx echo.Context, protocolID int) error {

	tokenBearer, err := auth.GetTokenObjectFromRequest(ctx.Request())
	if err != nil {
		return err
	}

	var uploadProtocolParams UploadProtocolParams
	err = ctx.Bind(&uploadProtocolParams)
	if err != nil {
		return err
	}

	//verify protocol exists
	protocol, err := w.repository.GetProtocol(protocolID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, defines.SimpleReturnMessage{Message: fmt.Sprintf("Protocol '%d' not found", protocolID)})
		}
		return nil
	}

	//verify token bearer is in author list
	if !protocol.AuthoredBy(tokenBearer.Username) {
		ctx.JSON(http.StatusForbidden, defines.SimpleReturnMessage{Message: fmt.Sprintf("You don't have rights to edit rotocol #%d", protocolID)})
		return nil
	}

	//DONE:
	//generate mask frame
	//enrich received protocol with calculated total_duration
	//enrich received protocol with calculated frames_count

	var protocolToStore defines.FullProtocol
	//Auto mapping
	bytes, _ := json.Marshal(uploadProtocolParams)
	//TODO: properly handle error
	json.Unmarshal(bytes, &protocolToStore)

	spew.Dump("AFTER AUTOMAPPING:")
	spew.Dump(protocolToStore)

	//Metadate generation
	protocolToStore.MaskFrame, protocolToStore.TotalDuration, protocolToStore.FrameCount = uploadProtocolParams.GenerateMeta()

	spew.Dump("AFTER META:")
	spew.Dump(protocolToStore)
	err = w.repository.OverwriteProtocol(protocolID, protocolToStore, tokenBearer.Username)
	if err != nil {
		return err
	}
	//spew.Dump(protocolID)

	_ = tokenBearer
	ctx.JSON(http.StatusNoContent, "")
	return nil
}

func (w *Handlers) DeleteProtocol(ctx echo.Context, protocolID int) error {

	tokenBearer, err := auth.GetTokenObjectFromRequest(ctx.Request())
	if err != nil {
		return err
	}

	//verify protocol exists
	protocol, err := w.repository.GetProtocol(protocolID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, defines.SimpleReturnMessage{Message: fmt.Sprintf("Protocol '%d' not found", protocolID)})
		}
		return nil
	}

	//verify token bearer is in author list
	if !protocol.AuthoredBy(tokenBearer.Username) {
		ctx.JSON(http.StatusForbidden, defines.SimpleReturnMessage{Message: fmt.Sprintf("You don't have rights to edit rotocol #%d", protocolID)})
		return nil
	}

	err = w.repository.DeleteProtocol(protocolID)
	if err != nil {
		return err
	}

	_ = tokenBearer
	ctx.JSON(http.StatusNoContent, "")
	return nil
}

// LogoutUser converts echo context to params.
func (w *Handlers) LogoutUser(ctx echo.Context) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

// DeleteUser converts echo context to params.
func (w *Handlers) DeleteUser(ctx echo.Context, username string) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

// GetUserByName converts echo context to params.
func (w *Handlers) GetUserByName(ctx echo.Context, username string) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

// UpdateUser converts echo context to params.
func (w *Handlers) UpdateUser(ctx echo.Context, username string) error {
	ctx.String(http.StatusOK, "Hello, World!")

	return nil
}

func (w *Handlers) GetProtocol(ctx echo.Context, protocolID int) error {

	protocol, err := w.repository.GetProtocol(protocolID)
	//TODO : here verify token bearer is in author list
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, defines.SimpleReturnMessage{Message: fmt.Sprintf("Protocol '%d' not found", protocolID)})
		}
		return err
	}
	//spew.Dump(protocol)

	//Mapping returned Object
	var returnedProtocol FullProtocol
	bytes, _ := json.Marshal(protocol)
	//TODO: properly handle error
	json.Unmarshal(bytes, &returnedProtocol)

	ctx.JSON(http.StatusOK, returnedProtocol)
	return nil
}

func (w *Handlers) GetPublicProtocol(ctx echo.Context, protocolID int) error {

	protocol, err := w.repository.GetProtocol(protocolID)
	//TODO : here, verify publicness of protocol
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, defines.SimpleReturnMessage{Message: fmt.Sprintf("Protocol '%d' not found", protocolID)})
		}
		return err
	}
	//spew.Dump(protocol)

	//Mapping returned Object
	var returnedProtocol FullProtocol
	bytes, _ := json.Marshal(protocol)
	//TODO: properly handle error
	json.Unmarshal(bytes, &returnedProtocol)

	ctx.JSON(http.StatusOK, returnedProtocol)
	return nil
}

func (w *Handlers) ServeSwaggerFile(ctx echo.Context) error {
	swagger, _ := GetSwagger()
	str, _ := swagger.MarshalJSON()
	ctx.Response().Header().Add("Content-Type", "application/json")
	ctx.Response().Write(str)
	return nil
}
