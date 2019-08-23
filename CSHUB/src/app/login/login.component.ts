import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UsersService } from '../services/users.service'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { LoginUserAction } from '../store/actions/user.actions';
import { User } from '../store/models/user.model';
import { Error } from '../store/models/error.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  loginUser: User = {_id: null, password: null};
  error$: Observable<Error>;


  constructor(private store: Store<AppState>, private fb: FormBuilder, private _usersService: UsersService, private router: Router) { }

  ngOnInit() {

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

  onSubmit() {

    this.loginUser._id = this.email;
    this.loginUser.password = this.password;


    this.store.dispatch(new LoginUserAction(this.loginUser));
    this.error$ = this.store.select(store => store.user.error)


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

