import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'




@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  url : string;

  

  postSignupUser(userData){
    this.url ="http://localhost:4200/users/signup";
    return this.http.post<any>(this.url, userData);
    

  };

}
