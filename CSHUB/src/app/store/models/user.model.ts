export interface User{
    _id?: string,
    email?: string,
    firstname?: string,
    lastname?: string,
    spotifyurl?: string,
    password? : string,
    local?: boolean,
    facebook?: boolean,
    social_id?: string,
    google?:boolean,
    accessToken?: string,
    notifications?: Object,
    msg?: string
}