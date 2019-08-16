import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoginService } from '../services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  errorHTML: string;
 
  constructor(private fb: FormBuilder, private _loginService: LoginService, private router: Router) { }

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
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  onSubmit() {
    this._loginService.postLoginUser(this.loginFormGroup.value)
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
        });
  }

}

