import { Injectable } from '@angular/core';
import { AddNote } from '../store/models/add-note.model';
import { Note } from '../store/models/note.model';
import { HttpClient } from '@angular/common/http'
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private URL = "https://localhost:4200/notes";

  constructor(private http: HttpClient) { }

  AddNote(addNoteData: AddNote) {
 
    return this.http.post<Note>(`${this.URL}/${addNoteData.userId}`, addNoteData)
      .pipe(delay(2000))

      ;
  };
}
