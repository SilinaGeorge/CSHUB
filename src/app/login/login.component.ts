import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { LoginUserAction } from '../store/actions/user.actions';
import { Auth } from '../store/models/auth.model';
import { Error } from '../store/models/error.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;

  loginFormGroup: FormGroup;
  loginUser: Auth = {email: null, password: null};
  error$: Observable<Error>;
  loading$: Observable<Boolean>;


  constructor(private http: HttpClient, private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {

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


  onSubmit() {

    this.loginUser.email = this.email;
    this.loginUser.password = this.password;


    this.loading$ = this.store.select(store => store.user.loading)
    this.store.dispatch(new LoginUserAction(this.loginUser));
    this.error$ = this.store.select(store => store.user.loginError)

  }

}

