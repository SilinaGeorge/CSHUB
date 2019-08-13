import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' 
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
 

  constructor(private fb: FormBuilder, private _loginService: LoginService) { }

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

  get email(){
    return this.loginFormGroup.get('email');
  }

  get password(){
    return this.loginFormGroup.get('password');
  } 

  onSubmit(){

     this._loginService.postLoginUser(this.loginFormGroup.value)
    .subscribe(
      response => console.log("Success", response),
      error => console.log("error", error)
    ) ;
  }

  

}
