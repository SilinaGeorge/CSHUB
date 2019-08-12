import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms' 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;
 

  constructor(private fb: FormBuilder) { }

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
  

}

// check password and verify password are the same
export const passwordMatchValidator: ValidatorFn = (passFormGroup: FormGroup): ValidationErrors | null => {
  if (passFormGroup.get('password').value === passFormGroup.get('verifypassword').value)
    return null;
  else
    return {passwordMismatch: true};
};

