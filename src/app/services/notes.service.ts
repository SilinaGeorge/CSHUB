import { Injectable } from '@angular/core';
import { AddNote } from '../store/models/add-note.model';
import { ReturnedNotes, GetNotes } from '../store/models/get-notes.model';
import { Note, DeleteNote, UpdateNote } from '../store/models/note.model';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private URL = environment.url + "/notes";

  constructor(private http: HttpClient) { }

  AddNote(addNoteData: AddNote) {
  
    return this.http.post<Note>(`${this.URL}/${addNoteData.userId}`, addNoteData, { withCredentials: true });
  };

  DeleteNote(deleteNoteData: DeleteNote) {

    return this.http.delete<Note>(`${this.URL}/${deleteNoteData._id}/${deleteNoteData.userId}`, { withCredentials: true });
  };

  UpdateNote(updateNoteData: UpdateNote) {

    return this.http.patch<Note>(`${this.URL}/${updateNoteData._id}`,updateNoteData, { withCredentials: true });
  };

  GetNotes(getTopicNotesData: GetNotes) {
    if ('topic' in getTopicNotesData)
      return this.http.get<ReturnedNotes>(`${this.URL}/${getTopicNotesData.userId}?topic=${getTopicNotesData.topic}`, { withCredentials: true });

      return this.http.get<ReturnedNotes>(`${this.URL}/${getTopicNotesData.userId}`, { withCredentials: true });
    
  };







}
