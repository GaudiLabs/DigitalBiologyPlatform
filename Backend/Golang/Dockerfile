# syntax=docker/dockerfile:1

## Build
FROM golang:1.19 AS build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN GOOS=linux GOARCH=amd64 go build -o /dbp_api

## Deploy
FROM alpine:3.16

WORKDIR /

COPY --from=build /dbp_api /dbp_api
COPY ./.env /.env

EXPOSE 8080

ENTRYPOINT [ "/dbp_api" ]