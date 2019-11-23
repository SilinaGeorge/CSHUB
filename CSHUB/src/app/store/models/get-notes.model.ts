import { Note } from '../models/note.model';

export interface GetAllUserNotes{
    userId: String
}
    

export interface GetTopicNotes{
    userId: String
    topic: String
}


export interface ReturnedTopicNotes{
    notes: Array<Note>
}
