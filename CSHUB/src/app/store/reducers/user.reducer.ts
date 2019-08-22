import { User } from "../models/user.model";
import { UserActionTypes, UserAction } from '../actions/user.actions';

export interface UserState{
    user: User,
    error: Error
}

const intialState: UserState = {
    user: null,
    error: null
};

export function UserReducer (state: UserState = intialState, action: UserAction){
    switch(action.type){
        case UserActionTypes.LOGIN_USER:
                return {...state, user: action.payload};
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return {...state, user: action.payload};
        case UserActionTypes.LOGIN_USER_ERROR:
                return {...state, error: action.payload};
        case UserActionTypes.SIGNUP_USER_SUCCESS:
                return {...state, user: action.payload};
        default:
            return state;
    }
};