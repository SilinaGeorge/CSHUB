import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../store/models/user.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "https://localhost:4200/auth";

  constructor(private http: HttpClient) { }

  signupUser(signupData: User) {
    return this.http.post<User>(`${this.URL}/signup`, signupData)
      .pipe(delay(2000))

      ;
  };

  loginUser(loginUserData: User) {
    return this.http.post<User>(`${this.URL}/login`, loginUserData)
      .pipe(delay(2000))

      ;
  };

  getSocialMediaUserInfo(socialMediaUserId: User){
    return this.http.get<User>(`${this.URL}/social/` + socialMediaUserId._id)
    .pipe(delay(2000))
    ;
  }

}
