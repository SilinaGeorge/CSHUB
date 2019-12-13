export interface Notification{
    _id: string,
    datetime: string,
    msg?: string
}

export interface AllNotifications{
    msg: string,
    _id: string,
    notifications: Array<string>
}

export interface GetNotifications{
    _id: string,
}