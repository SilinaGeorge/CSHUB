import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { LoginUserSuccessAction, UserActionTypes, LoginUserAction, LoginUserErrorAction, SignupUserAction, SignupUserSuccessAction, SignupUserErrorAction, GetSocialUserAction, GetSocialUserSuccessAction, GetSocialUserErrorAction } from '../actions/user.actions';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {

    @Effect() loginUser = this.actions$
        .pipe(
            ofType<LoginUserAction>(UserActionTypes.LOGIN_USER),
            mergeMap(
                data => this.authService.loginUser(data.payload)
                    .pipe(
                        map(data => {
                            this.router.navigateByUrl('/login-home')
                            return new LoginUserSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new LoginUserErrorAction(error.error))
                        }
                        )
                    )
            )
        )

        @Effect() getSocialUser = this.actions$
        .pipe(
            ofType<GetSocialUserAction>(UserActionTypes.GET_SOCIAL_USER),
            mergeMap(
                data => this.authService.getSocialMediaUserInfo(data.payload)
                    .pipe(
                        map(data => {
                            this.router.navigateByUrl('/login-home')
                            return new GetSocialUserSuccessAction(data)
                        }),
                        catchError((error) => {
                            this.router.navigateByUrl('/')
                            return of(new GetSocialUserErrorAction(error.error))
                        }
                        )
                    )
            )
        )

    @Effect() signupUser = this.actions$
        .pipe(
            ofType<SignupUserAction>(UserActionTypes.SIGNUP_USER),
            mergeMap(
                data => this.authService.signupUser(data.payload)
                    .pipe(
                        map(data => {
                            this.router.navigateByUrl('/login-home')
                            return new SignupUserSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new SignupUserErrorAction(error.error))
                        }
                        )
                    )
            )
        )

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

}