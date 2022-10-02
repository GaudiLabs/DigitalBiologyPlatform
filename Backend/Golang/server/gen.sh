#This script generate server.gen.go according to openAPI3_desc.yaml OpenAPI 3.0 definition
#!/bin/sh
oapi-codegen -old-config-style -package server -generate types,server,spec openAPI3_desc.yaml > server.gen.go
