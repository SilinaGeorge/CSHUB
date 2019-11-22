import { UserState } from '../reducers/user.reducer';
import { NotesState } from '../reducers/notes.reducer';


export interface AppState{
    readonly user: UserState,
    readonly noteState: NotesState,
};