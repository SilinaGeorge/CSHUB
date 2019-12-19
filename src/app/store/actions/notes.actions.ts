import { Action } from '@ngrx/store';
import { AddNote } from '../models/add-note.model';
import { GetAllUserNotes, GetNotes, ReturnedNotes } from '../models/get-notes.model';
import { Note, SelectedNote, DeleteNote, UpdateNote } from '../models/note.model';
import { Error } from '../models/error.model';

export enum NotesActionTypes{
    ADD_NOTE = '[NOTE] Add',
    ADD_NOTE_SUCCESS = '[NOTE] Add Success',
    ADD_NOTE_ERROR = '[NOTE] Add Error',

    DELETE_NOTE = '[NOTE] Delete',
    DELETE_NOTE_SUCCESS = '[NOTE] Delete Success',
    DELETE_NOTE_ERROR = '[NOTE] Delete Error',

    UPDATE_NOTE = '[NOTE] Update',
    UPDATE_NOTE_SUCCESS = '[NOTE] Update Success',
    UPDATE_NOTE_ERROR = '[NOTE] Update Error',

    GET_TOPIC_NOTES = '[NOTE] Get Topic Notes',
    GET_TOPIC_NOTES_SUCCESS = '[NOTE] Get Topic Notes Success',
    GET_TOPIC_NOTES_ERROR = '[NOTE] Get Topic Notes Error',

    SELECT_NOTE = '[NOTE] Select Note'
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

export class DeleteNoteAction implements Action{
    readonly type = NotesActionTypes.DELETE_NOTE;
    constructor(public payload: DeleteNote){};
}

export class DeleteNoteSuccessAction implements Action{
    readonly type = NotesActionTypes.DELETE_NOTE_SUCCESS;
    constructor(public payload: Note){};
}
export class DeleteNoteErrorAction implements Action{
    readonly type = NotesActionTypes.DELETE_NOTE_ERROR;
    constructor(public payload: Error){};
}

    export class GetNotesAction implements Action{
    readonly type = NotesActionTypes.GET_TOPIC_NOTES;
    constructor(public payload: GetNotes){};
}

export class GetNotesSuccessAction implements Action{
    readonly type = NotesActionTypes.GET_TOPIC_NOTES_SUCCESS;
    constructor(public payload: ReturnedNotes){};
}
export class GetNotesErrorAction implements Action{
    readonly type = NotesActionTypes.GET_TOPIC_NOTES_ERROR;
    constructor(public payload: Error){};
}

export class SelectNoteAction implements Action{
    readonly type = NotesActionTypes.SELECT_NOTE;
    constructor(public payload: SelectedNote){};
}

export class updateNoteAction implements Action{
    readonly type = NotesActionTypes.UPDATE_NOTE;
    constructor(public payload: UpdateNote){};
}

export class updateNoteSuccessAction implements Action{
    readonly type = NotesActionTypes.UPDATE_NOTE_SUCCESS;
    constructor(public payload: Note){};
}
export class updateNoteErrorAction implements Action{
    readonly type = NotesActionTypes.UPDATE_NOTE_ERROR;
    constructor(public payload: Error){};
}

export type NotesAction = 
AddNoteAction|
AddNoteSuccessAction | 
AddNoteErrorAction | 
GetNotesAction |
GetNotesSuccessAction |
GetNotesErrorAction |
SelectNoteAction |
DeleteNoteAction |
DeleteNoteSuccessAction |
DeleteNoteErrorAction |
updateNoteAction |
updateNoteSuccessAction |
updateNoteErrorAction

;