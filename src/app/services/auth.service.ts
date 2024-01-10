import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../store/models/user.model';
import { Auth, SocialMediaAuth } from '../store/models/auth.model';
import { SignUpUser } from '../store/models/sign-up-user.model';
import { environment } from './../../environments/environment';


interface isloggedin{
  isloggedin: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.url + "/auth";


  constructor(private http: HttpClient) { }



  signupUser(signupData: SignUpUser) {
    return this.http.post<User>(`${this.URL}/signup`, signupData, { withCredentials: true });
  };

  loginUser(loginUserData: Auth) {
    return this.http.post<User>(`${this.URL}/login`, loginUserData, { withCredentials: true } );


  };

  logoutUser() {
    return this.http.get<any>(`${this.URL}/logout`, { withCredentials: true }); 


  };

  getSocialMediaUserInfo(socialMediaUserId: SocialMediaAuth){
    return this.http.get<User>(`${this.URL}/social/` + socialMediaUserId._id, { withCredentials: true });
  }

  
  checkLoggedin(){
    return this.http.get<isloggedin>(`${this.URL}/checkloggedin`, { withCredentials: true });

  }

}

