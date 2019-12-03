import { UserState } from '../reducers/user.reducer';
import { NotesState } from '../reducers/notes.reducer';
import { DocsState } from '../reducers/docs.reducer';


export interface AppState{
    readonly user: UserState,
    readonly noteState: NotesState,
    readonly docsState: DocsState,
};