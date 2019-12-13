import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms'
import { Error } from '../store/models/error.model';
import { Observable } from 'rxjs';
import { SignupUserAction } from '../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { SignUpUser } from '../store/models/sign-up-user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;
  error$: Observable<Error>;
  loading$: Observable<Boolean>;
  signupUser: SignUpUser = {email: null, password: null, firstname: null, lastname: null};


  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

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
    this.signupUser.email = this.email;

    this.loading$ = this.store.select(store => store.user.loading)
    this.store.dispatch(new SignupUserAction(this.signupUser));
    this.error$ = this.store.select(store => store.user.signupError)

  }


}

// check password and verify password are the same
export const passwordMatchValidator: ValidatorFn = (passFormGroup: FormGroup): ValidationErrors | null => {
  if (passFormGroup.get('password').value === passFormGroup.get('verifypassword').value)
    return null;
  else
    return { passwordMismatch: true };
};



