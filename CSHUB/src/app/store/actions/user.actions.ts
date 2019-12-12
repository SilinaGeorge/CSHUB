//update state of action/ communicate with our store: dispatches action

import { Action } from '@ngrx/store';
import { User } from '../models/user.model';
import { Error } from '../models/error.model';
import { Auth, SocialMediaAuth } from '../models/auth.model';
import { SignUpUser } from '../models/sign-up-user.model';
import { Spotify } from '../models/spotify.model';
import { Notification } from '../models/notification.model';


export enum UserActionTypes{
    LOGIN_USER = '[USER] Login',
    LOGIN_USER_SUCCESS = '[USER] Login Success',
    LOGIN_USER_ERROR = '[USER] Login Error',

    SIGNUP_USER = '[USER] Signup',
    SIGNUP_USER_SUCCESS = '[USER] Signup Success',
    SIGNUP_USER_ERROR = '[USER] Signup Error',

    LOGOUT_USER = '[USER] Logout',
    LOGOUT_USER_SUCCESS = '[USER] Logout Success',
    LOGOUT_USER_ERROR = '[USER] Logout Error',

    GET_SOCIAL_USER = '[USER] Get Social Media User Info',
    GET_SOCIAL_USER_SUCCESS = '[USER] Get Social Media User Info Success',
    GET_SOCIAL_USER_ERROR = '[USER] Get Social Media User Info Error',

    UPDATE_SPOTIFY = '[USER] Update Spotify',
    UPDATE_SPOTIFY_SUCCESS = '[USER] Update Spotify Success',
    UPDATE_SPOTIFY_ERROR = '[USER] Update Spotify Error',

    ADD_NOTIF = '[USER] Add Notification',
    ADD_NOTIF_SUCCESS = '[USER] Add Notification Success',
    ADD_NOTIF_ERROR = '[USER] Add Notification Error',

    DELETE_NOTIF = '[USER] Delete Notification',
    DELETE_NOTIF_SUCCESS = '[USER] Delete Notification Success',
    DELETE_NOTIF_ERROR = '[USER] Delete Notification Error',
}
// LOGIN
export class LoginUserAction implements Action{
    readonly type = UserActionTypes.LOGIN_USER;
    constructor(public payload: Auth){};
}

export class LoginUserSuccessAction implements Action{
    readonly type = UserActionTypes.LOGIN_USER_SUCCESS;
    constructor(public payload: User){};
}
export class LoginUserErrorAction implements Action{
    readonly type = UserActionTypes.LOGIN_USER_ERROR;
    constructor(public payload: Error){};
}

// SIGNUP
export class SignupUserAction implements Action{
    readonly type = UserActionTypes.SIGNUP_USER;
    constructor(public payload: SignUpUser){};
}

export class SignupUserSuccessAction implements Action{
    readonly type = UserActionTypes.SIGNUP_USER_SUCCESS;
    constructor(public payload: User){};
}

export class SignupUserErrorAction implements Action{
    readonly type = UserActionTypes.SIGNUP_USER_ERROR;
    constructor(public payload: Error){};
}

// FACEBOOK LOGIN
export class GetSocialUserAction implements Action{
    readonly type = UserActionTypes.GET_SOCIAL_USER;
    constructor(public payload: SocialMediaAuth){};
}

export class GetSocialUserSuccessAction implements Action{
    readonly type = UserActionTypes.GET_SOCIAL_USER_SUCCESS;
    constructor(public payload: User){};
}
export class GetSocialUserErrorAction implements Action{
    readonly type = UserActionTypes.GET_SOCIAL_USER_ERROR;
    constructor(public payload: Error){};
}
export class UpdateSpotifyAction implements Action{
    readonly type = UserActionTypes.UPDATE_SPOTIFY;
    constructor(public payload: Spotify){};
}
export class UpdateSpotifySuccessAction implements Action{
    readonly type = UserActionTypes.UPDATE_SPOTIFY_SUCCESS;
    constructor(public payload: Spotify){};
}
export class UpdateSpotifyErrorAction implements Action{
    readonly type = UserActionTypes.UPDATE_SPOTIFY_ERROR;
    constructor(public payload: Error){};
}
export class AddNotifAction implements Action{
    readonly type = UserActionTypes.ADD_NOTIF;
    constructor(public payload: Notification){};
}
export class AddNotifActionSuccessAction implements Action{
    readonly type = UserActionTypes.ADD_NOTIF_SUCCESS;
    constructor(public payload: Notification){};
}
export class AddNotifActionErrorAction implements Action{
    readonly type = UserActionTypes.ADD_NOTIF_ERROR;
    constructor(public payload: Error){};
}
export class DeleteNotifAction implements Action{
    readonly type = UserActionTypes.DELETE_NOTIF;
    constructor(public payload: Notification){};
}
export class DeleteNotifActionSuccessAction implements Action{
    readonly type = UserActionTypes.DELETE_NOTIF_SUCCESS;
    constructor(public payload: Notification){};
}
export class DeleteNotifActionErrorAction implements Action{
    readonly type = UserActionTypes.DELETE_NOTIF_ERROR;
    constructor(public payload: Error){};
}

export class LogoutUserAction implements Action{
    readonly type = UserActionTypes.LOGOUT_USER;
    constructor(){};
}

export class LogoutUserSuccessAction implements Action{
    readonly type = UserActionTypes.LOGOUT_USER_SUCCESS;
    constructor(){};
}

export class LogoutUserErrorAction implements Action{
    readonly type = UserActionTypes.LOGOUT_USER_ERROR;
    constructor(public payload: Error){};
}

export type UserAction = 
LoginUserAction|
LoginUserSuccessAction | 
LoginUserErrorAction |
SignupUserAction|
SignupUserSuccessAction |
SignupUserErrorAction |
GetSocialUserAction|
GetSocialUserSuccessAction | 
GetSocialUserErrorAction |
UpdateSpotifyAction |
UpdateSpotifySuccessAction |
UpdateSpotifyErrorAction |
AddNotifAction |
AddNotifActionSuccessAction |
AddNotifActionErrorAction |
DeleteNotifAction |
DeleteNotifActionSuccessAction |
DeleteNotifActionErrorAction |
LogoutUserAction |
LogoutUserSuccessAction |
LogoutUserErrorAction
;