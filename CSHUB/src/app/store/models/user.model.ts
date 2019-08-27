export interface User{
    _id?: string,
    email?: string,
    firstname?: string,
    lastname?: string,
    spotifyurl?: string,
    password? : string,
    local?: boolean,
    facebook?: boolean,
    facebook_id?: string,
    google?:boolean,
    google_id?: string,
    accessToken?: string,
    notifications?: Object,
    msg?: string
}