import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url : string;

  putUser(userData){
    console.log("ere");
    console.log(userData );
    this.url ="http://localhost:4200/login";
    return this.http.post<any>(this.url, userData);
  };
}
