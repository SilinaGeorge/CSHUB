import { Injectable } from '@angular/core';

import { Effect, Actions, ofType} from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { LoginUserSuccessAction, UserActionTypes, LoginUserAction, LoginUserErrorAction, SignupUserAction, SignupUserSuccessAction, SignupUserErrorAction } from '../actions/user.actions';
import { UsersService} from '../../services/users.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UsersEffects{

@Effect() loginUser = this.actions$
.pipe(
    ofType<LoginUserAction>(UserActionTypes.LOGIN_USER),
    mergeMap(
        data => this.userService.loginUser(data.payload)
        .pipe(
            map(data => {
                this.router.navigateByUrl('/login-home')
                return new LoginUserSuccessAction(data)}),
            catchError((error) =>{            
                return of(new LoginUserErrorAction(error.error))}
                )
        )
    )
)

@Effect() signupUser = this.actions$
.pipe(
    ofType<SignupUserAction>(UserActionTypes.SIGNUP_USER),
    mergeMap(
        data => this.userService.signupUser(data.payload)
        .pipe(
            map(data => {
                this.router.navigateByUrl('/login-home')
                return new SignupUserSuccessAction(data)}),
            catchError((error) =>{            
                return of(new SignupUserErrorAction(error.error))}
                )
        )
    )
)

constructor (private actions$: Actions, private userService: UsersService, private router: Router){}

}