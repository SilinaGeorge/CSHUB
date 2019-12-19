export interface User{
    _id: string,
    email: string,
    firstname: string,
    lastname: string,
    msg?: string
}

export interface GetSpaceLeft{
    id: string
}

export interface SpaceLeft {
    msg?: string,
    spaceleft: Number
}