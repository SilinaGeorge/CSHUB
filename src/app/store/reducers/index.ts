import { UserState, UserReducer } from '../reducers/user.reducer';
import {ActionReducerMap} from '@ngrx/store'

export interface AppState{
     user: UserState;
};

/* export const reducers: ActionReducerMap<AppState> ={
    user: UserReducer

} */