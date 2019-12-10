import { Note } from '../models/note.model';

export interface GetAllUserNotes{
    userId: String
}
    

export interface GetNotes{
    userId: String
    topic?: String
}


export interface ReturnedNotes{
    notes: Array<Note>
}
