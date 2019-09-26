//update state of action/ communicate with our store: dispatches action

import { Action } from '@ngrx/store';
import { User } from '../models/user.model';
import { Error } from '../models/error.model';
import { Auth, SocialMediaAuth } from '../models/auth.model';
import { SignUpUser } from '../models/sign-up-user.model';

export enum UserActionTypes{
    LOGIN_USER = '[USER] Login',
    LOGIN_USER_SUCCESS = '[USER] Login Success',
    LOGIN_USER_ERROR = '[USER] Login Error',
    SIGNUP_USER = '[USER] Signup',
    SIGNUP_USER_SUCCESS = '[USER] Signup Success',
    SIGNUP_USER_ERROR = '[USER] Signup Error',
    GET_SOCIAL_USER = '[USER] Get Social Media User Info',
    GET_SOCIAL_USER_SUCCESS = '[USER] Get Social Media User Info Success',
    GET_SOCIAL_USER_ERROR = '[USER] Get Social Media User Info Error',
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


export type UserAction = 
LoginUserAction|
LoginUserSuccessAction | 
LoginUserErrorAction |
SignupUserAction|
SignupUserSuccessAction |
SignupUserErrorAction |
GetSocialUserAction|
GetSocialUserSuccessAction | 
GetSocialUserErrorAction 
;