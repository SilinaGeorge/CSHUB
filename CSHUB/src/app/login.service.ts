import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url : string;

  postUser(userData){;
    this.url ="http://localhost:4200/login";
    return this.http.post<any>(this.url, userData);
    

  };
}
