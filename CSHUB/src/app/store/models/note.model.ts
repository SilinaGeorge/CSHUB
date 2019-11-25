export interface Note{
    msg?: String,
    noteId: String,
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
    noteId: String,
    description: String,
    name: String,
    content: String

}