export function GenerateAuthHeader(username, token) {
    console.log(token)
    const accessHeaderTemplate = {
        u: "username",
        t: "token",
    }

    const accessHeader = Object.create(accessHeaderTemplate);
    accessHeader.u = username
    accessHeader.t = token.token

    let stringifiedHeader = JSON.stringify(accessHeader)
    console.log(stringifiedHeader)
    return btoa(stringifiedHeader)
}