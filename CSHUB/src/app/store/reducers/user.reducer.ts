import { User } from "../models/user.model";
import { Error } from "../models/error.model";
import { UserActionTypes, UserAction } from '../actions/user.actions';

export interface UserState {
    user: User,
    signupError: Error,
    loginError: Error,
    getSocialUserError: Error,
    loading: boolean
}

const intialState: UserState = {
    user: null,
    signupError: null,
    loginError: null,
    getSocialUserError: null,
    loading: false
};

export function UserReducer(state: UserState = intialState, action: UserAction) {
    switch (action.type) {
        case UserActionTypes.LOGIN_USER:
            return { ...state, user: action.payload, loading: true };
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case UserActionTypes.LOGIN_USER_ERROR:
            return { ...state, loginError: action.payload, loading: false };
        case UserActionTypes.SIGNUP_USER:
            return { ...state, user: action.payload, loading: true };
        case UserActionTypes.SIGNUP_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case UserActionTypes.SIGNUP_USER_ERROR:
            return { ...state, signupError: action.payload, loading: false };
        case UserActionTypes.GET_SOCIAL_USER:
            return { ...state, loading: true,  user: action.payload };
        case UserActionTypes.GET_SOCIAL_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case UserActionTypes.GET_SOCIAL_USER_ERROR:
            return { ...state, getSocialUserError: action.payload, loading: false };
        default:
            return state;
    }
};