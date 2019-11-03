export interface User{
    _id: string,
    email: string,
    firstname: string,
    lastname: string,
    spotifyurl: string,
    local: boolean,
    facebook: boolean,
    social_id?: string,
    google:boolean,
    accessToken?: string,
    notifications?: Array<String>,
    msg?: string
}