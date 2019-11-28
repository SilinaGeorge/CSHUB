export interface Note{
    msg?: String,
    _id: String,
    userId: String,
    content: String,
    description: String,
    name: String,
    topic: String,
    dateCreate: Date,
    dateModifiedString: String
}

export interface SelectedNote{
    note: Note,
    newNote: boolean
}

export interface SaveNote{
    userId: String,
    _id: String,
    description: String,
    name: String,
    content: String

}