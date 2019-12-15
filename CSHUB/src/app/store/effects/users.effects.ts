import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { UpdateSpotifyAction, UpdateSpotifyErrorAction, UpdateSpotifySuccessAction ,LoginUserSuccessAction, UserActionTypes, LoginUserAction, LoginUserErrorAction, SignupUserAction, SignupUserSuccessAction, SignupUserErrorAction, GetSocialUserAction, GetSocialUserSuccessAction, GetSocialUserErrorAction, AddNotifAction, AddNotifActionSuccessAction, AddNotifActionErrorAction, DeleteNotifActionSuccessAction, DeleteNotifActionErrorAction, DeleteNotifAction, LogoutUserAction, LogoutUserSuccessAction, LogoutUserErrorAction, GetSpotifyAction, GetSpotifySuccessAction, GetSpotifyErrorAction, GetNotifsAction, GetNotifsActionSuccessAction, GetNotifsActionErrorAction, GetSpaceLeftAction, GetSpaceLeftActionSuccessAction, GetSpaceLeftActionErrorAction } from '../actions/user.actions';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { WidgetService } from '../../services/widget.service';
import { GetNotesSuccessAction } from '../actions/notes.actions';
import { GetSpaceLeft } from '../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UsersEffects {

    @Effect() loginUser = this.actions$
        .pipe(
            ofType<LoginUserAction>(UserActionTypes.LOGIN_USER),
            mergeMap(
                data => this.authService.loginUser(data.payload)
                    .pipe(
                        map(data => {
                            sessionStorage.setItem("user", JSON.stringify(data));
                            
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
                            sessionStorage.setItem("user", JSON.stringify(data));
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
                            sessionStorage.setItem("user", JSON.stringify(data));
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

        @Effect() GetSpotify = this.actions$
        .pipe(
            ofType<GetSpotifyAction>(UserActionTypes.GET_SPOTIFY),
            mergeMap(
                data => this.widgetService.GetSpotify(data.payload)
                    .pipe(
                        map(data => {
                            return new GetSpotifySuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new GetSpotifyErrorAction(error.error))
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

        @Effect() DeleteNotif = this.actions$
        .pipe(
            ofType<DeleteNotifAction>(UserActionTypes.DELETE_NOTIF),
            mergeMap(
                data => this.widgetService.DeleteNotif(data.payload)
                    .pipe(
                        map(data => {
                            return new DeleteNotifActionSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new DeleteNotifActionErrorAction(error.error))
                        }
                        )
                    )
            )
        )

        @Effect() GetNotif = this.actions$
        .pipe(
            ofType<GetNotifsAction>(UserActionTypes.GET_NOTIFS),
            mergeMap(
                data => this.widgetService.GetNotifs(data.payload)
                    .pipe(
                        map(data => {
                            return new GetNotifsActionSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new GetNotifsActionErrorAction(error.error))
                        }
                        )
                    )
            )
        )

        @Effect() logout = this.actions$
        .pipe(
            ofType<LogoutUserAction>(UserActionTypes.LOGOUT_USER),
            mergeMap(
                data => this.authService.logoutUser()
                    .pipe(
                        map(data => {
                           
                            this.router.navigateByUrl('/')
                            return new LogoutUserSuccessAction()
                        }),
                        catchError((error) => {
                            this.router.navigateByUrl('/')
                            return of(new LogoutUserErrorAction(error.error))
                        }
                        )
                    )
            )
        )


        @Effect() GetSpaceLeft = this.actions$
        .pipe(
            ofType<GetSpaceLeftAction>(UserActionTypes.GET_SPACE_LEFT),
            mergeMap(
                data => this.userService.GetSpaceLeft(data.payload)
                    .pipe(
                        map(data => {
                            return new GetSpaceLeftActionSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new GetSpaceLeftActionErrorAction(error.error))
                        }
                        )
                    )
            )
        )

    constructor(private actions$: Actions, private authService: AuthService, private widgetService: WidgetService, private userService: UserService, private router: Router) { }

}