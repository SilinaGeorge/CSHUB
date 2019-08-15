import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url : string;

  postLoginUser(userData){;
    this.url ="http://localhost:4200/users/login";
    return this.http.post<any>(this.url, userData);
    

  };
}
