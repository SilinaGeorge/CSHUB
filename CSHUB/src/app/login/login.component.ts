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
  errorHTML :string;


  constructor(private fb: FormBuilder, private _loginService: LoginService) { }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        //Validators.email
      ]],

      password: ['', [
        Validators.required
      ]],

    });
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  onSubmit() {

    this._loginService.postLoginUser(this.loginFormGroup.value)
      .subscribe(
        error => {
          console.log(error.msg)
          this.errorHTML = ''
          if ('msg' in error) {
            if (Array.isArray(error.msg)) {

              this.errorHTML += `<li>${error}</li>`
            }
            else this.errorHTML =  `<li>${error}</li>`

            
            
          }
        });
  }

}
 
