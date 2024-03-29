import { Injectable } from '@angular/core';
import { AddDoc, Doc, GetMetaDocs, ReturnedMetaDocs, DeleteDoc, UpdateDoc } from '../store/models/docs.model';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  private URL = environment.url + "/docs";

  constructor(private http: HttpClient) { }

  AddDoc(addDocData: AddDoc) {
    const uploadData = new FormData();
    uploadData.append('doc', addDocData.file);
    uploadData.append('name', addDocData.name);
    uploadData.append('description', addDocData.description);
    uploadData.append('topic', addDocData.topic);
  
    return this.http.post<Doc>(`${this.URL}/${addDocData.userId}`, uploadData, { withCredentials: true });
  };

  GetDocs(getDocsData: GetMetaDocs) {
    if ('topic' in getDocsData)
    return this.http.get<ReturnedMetaDocs>(`${this.URL}/user/${getDocsData.userId}?topic=${getDocsData.topic}`, { withCredentials: true });

    return this.http.get<ReturnedMetaDocs>(`${this.URL}/user/${getDocsData.userId}`, { withCredentials: true });
  };

  DeleteDoc(deleteDocData: DeleteDoc) {
    return this.http.delete<Doc>(`${this.URL}/${deleteDocData.userId}/${deleteDocData._id}`, { withCredentials: true });
  };

  UpdateDoc(updateDocData: UpdateDoc) {
    return this.http.patch<Doc>(`${this.URL}/${updateDocData._id}`, updateDocData, { withCredentials: true });
  };

}



