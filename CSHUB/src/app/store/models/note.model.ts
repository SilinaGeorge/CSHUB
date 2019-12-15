export interface Note{
    msg?: String,
    _id: String,
    userId: String,
    content: string,
    description: String,
    name: String,
    topic: String,
    dateCreate: Date | string,
    dateModifiedString: String,
    size: string
}

export interface SelectedNote{
    note: Note,
    newNote: boolean
}

export interface UpdateNote{
    _id:String
    userId: String,
    description: String,
    name: String,
    content?: string

}

export interface DeleteNote{
    _id: String,
    userId: String
}