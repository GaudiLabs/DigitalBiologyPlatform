#!/bin/bash
TOKEN=$(curl -v 'http://localhost:8080/user/login' -X POST -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -H 'Sec-Fetch-Dest: document' -H 'Sec-Fetch-Mode: navigate' -H 'Sec-Fetch-Site: cross-site' -H 'Content-Type: application/json' -H 'Origin: null' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data-raw "{\"username\" : \"$1\", \"password\" : \"$2\", \"captcha_token\" : \"$3\"}")
echo $TOKEN | jq
TOKEN_ONLY=$(echo $TOKEN | jq -r ".token")
echo "{\"u\": \"$1\", \"t\" : \"$TOKEN_ONLY\"}" | base64
