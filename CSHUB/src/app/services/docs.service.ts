import { Injectable } from '@angular/core';
import { AddDoc, Doc } from '../store/models/docs.model';
import { HttpClient } from '@angular/common/http'
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DocsService {
  private URL = "https://localhost:4200/docs";

  constructor(private http: HttpClient) { }

  AddDoc(addDocData: AddDoc) {
    const uploadData = new FormData();
    uploadData.append('doc', addDocData.file);
    uploadData.append('name', addDocData.name);
    uploadData.append('description', addDocData.description);
    uploadData.append('topic', addDocData.topic);
  
    return this.http.post<Doc>(`${this.URL}/${addDocData.userId}`, uploadData);
  };
}



