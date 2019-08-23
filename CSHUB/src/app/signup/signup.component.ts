import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms'
import { UsersService } from "../services/users.service";
import { Router } from '@angular/router';
import { User } from '../store/models/user.model';
import { Error } from '../store/models/error.model';
import { Observable } from 'rxjs';
import { SignupUserAction } from '../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;
  error$: Observable<Error>;
  signupUser: User = {_id: null, password: null, firstname: null, lastname: null};


  constructor(private store: Store<AppState>, private fb: FormBuilder, private _userService: UsersService, private router: Router) { }

  ngOnInit() {
    //this.error$ = null;

    this.signupFormGroup = this.fb.group({

      firstname: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]],

      lastname: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required
      ]],

      verifypassword: ['', [
        Validators.required
      ]]

    }, { validator: passwordMatchValidator });
  }

  get firstname() {
    return this.signupFormGroup.get('firstname').value;
  }
  get lastname() {
    return this.signupFormGroup.get('lastname').value;
  }

  get email() {
    return this.signupFormGroup.get('email').value;
  }

  get password() {
    return this.signupFormGroup.get('password').value;
  }

  get verifypassword() {
    return this.signupFormGroup.get('verifypassword');
  }

  // check to see if passwords match on every input
  onPasswordInput() {
    if (this.signupFormGroup.hasError('passwordMismatch'))
      this.verifypassword.setErrors([{ 'passwordMismatch': true }]);
    else
      this.verifypassword.setErrors(null);
  }

  onSubmit() {

    this.signupUser.firstname = this.firstname;
    this.signupUser.lastname = this.lastname;
    this.signupUser.password = this.password;
    this.signupUser._id = this.email;

    this.store.dispatch(new SignupUserAction(this.signupUser));
    this.error$ = this.store.select(store => store.user.error)

    /* this._userService.signupUser({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    })
      .subscribe(
        response => this.router.navigateByUrl('/'),
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

// check password and verify password are the same
export const passwordMatchValidator: ValidatorFn = (passFormGroup: FormGroup): ValidationErrors | null => {
  if (passFormGroup.get('password').value === passFormGroup.get('verifypassword').value)
    return null;
  else
    return { passwordMismatch: true };
};



