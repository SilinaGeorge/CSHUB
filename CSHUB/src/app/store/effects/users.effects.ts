import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { UpdateSpotifyAction, UpdateSpotifyErrorAction, UpdateSpotifySuccessAction ,LoginUserSuccessAction, UserActionTypes, LoginUserAction, LoginUserErrorAction, SignupUserAction, SignupUserSuccessAction, SignupUserErrorAction, GetSocialUserAction, GetSocialUserSuccessAction, GetSocialUserErrorAction, AddNotifAction, AddNotifActionSuccessAction, AddNotifActionErrorAction } from '../actions/user.actions';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { WidgetService } from '../../services/widget.service';

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

        @Effect() UpdateSpotify = this.actions$
        .pipe(
            ofType<UpdateSpotifyAction>(UserActionTypes.UPDATE_SPOTIFY),
            mergeMap(
                data => this.widgetService.PatchSpotify(data.payload)
                    .pipe(
                        map(data => {
                            return new UpdateSpotifySuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new UpdateSpotifyErrorAction(error.error))
                        }
                        )
                    )
            )
        )

        @Effect() AddNotif = this.actions$
        .pipe(
            ofType<AddNotifAction>(UserActionTypes.ADD_NOTIF),
            mergeMap(
                data => this.widgetService.PutNotif(data.payload)
                    .pipe(
                        map(data => {
                            return new AddNotifActionSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new AddNotifActionErrorAction(error.error))
                        }
                        )
                    )
            )
        )

    constructor(private actions$: Actions, private authService: AuthService, private widgetService: WidgetService, private router: Router) { }

}