import { User } from "../models/user.model";
import { Error } from "../models/error.model";
import { UserActionTypes, UserAction } from '../actions/user.actions';

export interface UserState{
    user: User,
    error: Error,
    loading: boolean
}

const intialState: UserState = {
    user: null,
    error: null,
    loading: false
};

export function UserReducer (state: UserState = intialState, action: UserAction){
    switch(action.type){
        case UserActionTypes.LOGIN_USER:
                return {...state, user: action.payload, loading:true};
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return {...state, user: action.payload, loading:false};
        case UserActionTypes.LOGIN_USER_ERROR:
                return {...state, error: action.payload, loading:false};
        case UserActionTypes.SIGNUP_USER:
            return {...state, user: action.payload, loading:true};
        case UserActionTypes.SIGNUP_USER_SUCCESS:
                return {...state, user: action.payload, loading:false};
        case UserActionTypes.SIGNUP_USER_ERROR:
                return {...state, error: action.payload, loading:false};
        default:
            return state;
    }
};