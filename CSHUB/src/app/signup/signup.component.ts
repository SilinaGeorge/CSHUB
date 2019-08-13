import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms' 
import { SignupService } from "../services/signup.service"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;
 

  constructor(private fb: FormBuilder , private _signupService: SignupService) { }

  ngOnInit() {

    this.signupFormGroup= this.fb.group({

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

    }, {validator: passwordMatchValidator});
  }

  get firstname(){
    return this.signupFormGroup.get('firstname');
  }
  get lastname(){
    return this.signupFormGroup.get('lastname');
  }

  get email(){
    return this.signupFormGroup.get('email');
  } 

  get password(){
    return this.signupFormGroup.get('password');
  }

  get verifypassword(){
    return this.signupFormGroup.get('verifypassword');
  } 

  // check to see if passwords match on every input
  onPasswordInput() {
    if (this.signupFormGroup.hasError('passwordMismatch'))
      this.verifypassword.setErrors([{'passwordMismatch': true}]);
    else
      this.verifypassword.setErrors(null);
  }

  onSubmit(){

    console.log(this.signupFormGroup.value)
    this._signupService.postSignupUser(
      {firstname: this.signupFormGroup.get('firstname').value,
        lastname: this.signupFormGroup.get('lastname').value,
        email: this.signupFormGroup.get('email').value,
        password: this.signupFormGroup.get('password').value})
   .subscribe(
     response => console.log("Success", response),
     error => console.log("error", error)
   ) ;
  }

}

// check password and verify password are the same
export const passwordMatchValidator: ValidatorFn = (passFormGroup: FormGroup): ValidationErrors | null => {
  if (passFormGroup.get('password').value === passFormGroup.get('verifypassword').value)
    return null;
  else
    return {passwordMismatch: true};
};



