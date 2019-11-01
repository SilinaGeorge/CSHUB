import { UserState } from '../reducers/user.reducer';


export interface AppState{
    readonly user: UserState,
};