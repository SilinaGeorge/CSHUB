import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { LoginUserAction } from '../store/actions/user.actions';
import { User } from '../store/models/user.model';
import { Error } from '../store/models/error.model';
import { Observable } from 'rxjs';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient } from '@angular/common/http'
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  loginFormGroup: FormGroup;
  loginUser: User = {email: null, password: null};
  error$: Observable<Error>;
  loading$: Observable<Boolean>;


  constructor(private http: HttpClient,private authService: AuthService, private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });

    

    //this.error$ = null;
    
    this.loginFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required
      ]],

    });
  }

  get email() {
    return this.loginFormGroup.get('email').value;
  }

  get password() {
    return this.loginFormGroup.get('password').value;
  }

  fbLogin(){
  /*   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      //on success
      //this will return user data from google. What you need is a user token which you will send it to the server
      //actions
      //this.sendToRestApiMethod(userData.idToken);
      
   }); */

   this.http.get<any>('https://localhost:4200/auth/facebook').subscribe(
        response => console.log(response)); 


  }

  fbSignOut(): void {
    this.authService.signOut();
  }

  googleLogin(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      //on success
      //this will return user data from google. What you need is a user token which you will send it to the server
      //actions
      //this.sendToRestApiMethod(userData.idToken);
   });
  }

  onSubmit() {

    this.loginUser.email = this.email;
    this.loginUser.password = this.password;


    this.loading$ = this.store.select(store => store.user.loading)
    this.store.dispatch(new LoginUserAction(this.loginUser));
    this.error$ = this.store.select(store => store.user.loginError)


/*     this._usersService.loginUser(this.loginFormGroup.value)
      .subscribe(
        response => this.router.navigateByUrl('/login-home'),
        error => {
          this.errorHTML = ''
          if ('msg' in error.error) {
            if (Array.isArray(error.error.msg)) {

              error.error.msg.forEach(element => {
                this.errorHTML += `<li>${element}</li>`

              });
            }
            else this.errorHTML = `<li>${error.error.msg}</li>`
          }
        }); */
  }

}

