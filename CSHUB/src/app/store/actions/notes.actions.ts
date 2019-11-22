import { Action } from '@ngrx/store';
import { AddNote } from '../models/add-note.model';
import { Note } from '../models/note.model';
import { Error } from '../models/error.model';

export enum NotesActionTypes{
    ADD_NOTE = '[NOTE] Add',
    ADD_NOTE_SUCCESS = '[NOTE] Add Success',
    ADD_NOTE_ERROR = '[NOTE] Add Error',

}

export class AddNoteAction implements Action{
    readonly type = NotesActionTypes.ADD_NOTE;
    constructor(public payload: AddNote){};
}

export class AddNoteSuccessAction implements Action{
    readonly type = NotesActionTypes.ADD_NOTE_SUCCESS;
    constructor(public payload: Note){};
}
export class AddNoteErrorAction implements Action{
    readonly type = NotesActionTypes.ADD_NOTE_ERROR;
    constructor(public payload: Error){};
}

export type NotesAction = 
AddNoteAction|
AddNoteSuccessAction | 
AddNoteErrorAction
;