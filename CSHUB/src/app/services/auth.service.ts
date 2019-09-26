import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../store/models/user.model';
import { Auth, SocialMediaAuth } from '../store/models/auth.model';
import { SignUpUser } from '../store/models/sign-up-user.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "https://localhost:4200/auth";

  constructor(private http: HttpClient) { }

  signupUser(signupData: SignUpUser) {
    return this.http.post<User>(`${this.URL}/signup`, signupData)
      .pipe(delay(2000))

      ;
  };

  loginUser(loginUserData: Auth) {
    return this.http.post<User>(`${this.URL}/login`, loginUserData)
      .pipe(delay(2000))

      ;
  };

  getSocialMediaUserInfo(socialMediaUserId: SocialMediaAuth){
    return this.http.get<User>(`${this.URL}/social/` + socialMediaUserId._id)
    .pipe(delay(2000))
    ;
  }

}
