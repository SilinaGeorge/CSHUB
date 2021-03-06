//update state of action/ communicate with our store: dispatches action

import { Action } from '@ngrx/store';
import { User, GetSpaceLeft, SpaceLeft } from '../models/user.model';
import { Error } from '../models/error.model';
import { Auth, SocialMediaAuth } from '../models/auth.model';
import { SignUpUser } from '../models/sign-up-user.model';
import { Spotify, GetSpotify } from '../models/spotify.model';
import { Notification,AllNotifications, GetNotifications, DeleteNotifs } from '../models/notification.model';



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

    GET_SPOTIFY = '[USER] Get Spotify',
    GET_SPOTIFY_SUCCESS = '[USER] Get Spotify Success',
    GET_SPOTIFY_ERROR = '[USER] Get Spotify Error',

    ADD_NOTIF = '[USER] Add Notification',
    ADD_NOTIF_SUCCESS = '[USER] Add Notification Success',
    ADD_NOTIF_ERROR = '[USER] Add Notification Error',

    DELETE_NOTIFS = '[USER] Delete Notification',
    DELETE_NOTIFS_SUCCESS = '[USER] Delete Notification Success',
    DELETE_NOTIFS_ERROR = '[USER] Delete Notification Error',

    GET_NOTIFS = '[USER] Get Notification',
    GET_NOTIFS_SUCCESS = '[USER] Get Notification Success',
    GET_NOTIFS_ERROR = '[USER] Get Notification Error',

    GET_SPACE_LEFT = '[USER] Get Space Left',
    GET_SPACE_LEFT_SUCCESS = '[USER] Get Space Left Success',
    GET_SPACE_LEFT_ERROR = '[USER] Get Space Left Error',
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

// SPOTIFY
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

export class GetSpotifyAction implements Action{
    readonly type = UserActionTypes.GET_SPOTIFY;
    constructor(public payload: GetSpotify){};
}
export class GetSpotifySuccessAction implements Action{
    readonly type = UserActionTypes.GET_SPOTIFY_SUCCESS;
    constructor(public payload: Spotify){};
}
export class GetSpotifyErrorAction implements Action{
    readonly type = UserActionTypes.GET_SPOTIFY_ERROR;
    constructor(public payload: Error){};
}

//NOTIFICATIONS
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
export class DeleteNotifsAction implements Action{
    readonly type = UserActionTypes.DELETE_NOTIFS;
    constructor(public payload: DeleteNotifs){};
}
export class DeleteNotifsActionSuccessAction implements Action{
    readonly type = UserActionTypes.DELETE_NOTIFS_SUCCESS;
    constructor(public payload: DeleteNotifs){};
}
export class DeleteNotifsActionErrorAction implements Action{
    readonly type = UserActionTypes.DELETE_NOTIFS_ERROR;
    constructor(public payload: Error){};
}

export class GetNotifsAction implements Action{
    readonly type = UserActionTypes.GET_NOTIFS;
    constructor(public payload: GetNotifications){};
}
export class GetNotifsActionSuccessAction implements Action{
    readonly type = UserActionTypes.GET_NOTIFS_SUCCESS;
    constructor(public payload: AllNotifications){};
}
export class GetNotifsActionErrorAction implements Action{
    readonly type = UserActionTypes.GET_NOTIFS_ERROR;
    constructor(public payload: Error){};
}

//LOGOUT
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

//GET SPACE LEFT
export class GetSpaceLeftAction implements Action{
    readonly type = UserActionTypes.GET_SPACE_LEFT;
    constructor(public payload: GetSpaceLeft){};
}
export class GetSpaceLeftActionSuccessAction implements Action{
    readonly type = UserActionTypes.GET_SPACE_LEFT_SUCCESS;
    constructor(public payload: SpaceLeft){};
}
export class GetSpaceLeftActionErrorAction implements Action{
    readonly type = UserActionTypes.GET_SPACE_LEFT_ERROR;
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
DeleteNotifsAction |
DeleteNotifsActionSuccessAction |
DeleteNotifsActionErrorAction |
LogoutUserAction |
LogoutUserSuccessAction |
LogoutUserErrorAction |
GetNotifsAction |
GetNotifsActionSuccessAction |
GetNotifsActionErrorAction |
GetSpotifyAction |
GetSpotifySuccessAction |
GetSpotifyErrorAction |
GetSpaceLeftAction |
GetSpaceLeftActionSuccessAction |
GetSpaceLeftActionErrorAction
;