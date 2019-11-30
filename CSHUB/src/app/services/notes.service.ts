import { Injectable } from '@angular/core';
import { AddNote } from '../store/models/add-note.model';
import { ReturnedTopicNotes, GetTopicNotes } from '../store/models/get-notes.model';
import { Note, DeleteNote, UpdateNote } from '../store/models/note.model';
import { HttpClient } from '@angular/common/http'
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private URL = "https://localhost:4200/notes";

  constructor(private http: HttpClient) { }

  AddNote(addNoteData: AddNote) {
  
    return this.http.post<Note>(`${this.URL}/${addNoteData.userId}`, addNoteData);
  };

  DeleteNote(deleteNoteData: DeleteNote) {

    return this.http.delete<Note>(`${this.URL}/${deleteNoteData._id}/${deleteNoteData.userId}`);
  };

  UpdateNote(updateNoteData: UpdateNote) {

    return this.http.patch<Note>(`${this.URL}/${updateNoteData._id}`,updateNoteData);
  };

  GetTopicNotes(getTopicNotesData: GetTopicNotes) {
 
    return this.http.get<ReturnedTopicNotes>(`${this.URL}/${getTopicNotesData.userId}?topic=${getTopicNotesData.topic}`);
  };







}
