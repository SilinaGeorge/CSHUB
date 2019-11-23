import { Action } from '@ngrx/store';
import { AddNote } from '../models/add-note.model';
import { GetAllUserNotes, GetTopicNotes, ReturnedTopicNotes } from '../models/get-notes.model';
import { Note } from '../models/note.model';
import { Error } from '../models/error.model';

export enum NotesActionTypes{
    ADD_NOTE = '[NOTE] Add',
    ADD_NOTE_SUCCESS = '[NOTE] Add Success',
    ADD_NOTE_ERROR = '[NOTE] Add Error',

    GET_TOPIC_NOTES = '[NOTE] Get Topic Notes',
    GET_TOPIC_NOTES_SUCCESS = '[NOTE] Get Topic Notes Success',
    GET_TOPIC_NOTES_ERROR = '[NOTE] Get Topic Notes Error',
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

    export class GetTopicNotesAction implements Action{
        readonly type = NotesActionTypes.GET_TOPIC_NOTES;
        constructor(public payload: GetTopicNotes){};
    }
    
    export class GetTopicNotesSuccessAction implements Action{
        readonly type = NotesActionTypes.GET_TOPIC_NOTES_SUCCESS;
        constructor(public payload: ReturnedTopicNotes){};
    }
    export class GetTopicNotesErrorAction implements Action{
        readonly type = NotesActionTypes.GET_TOPIC_NOTES_ERROR;
        constructor(public payload: Error){};
}

export type NotesAction = 
AddNoteAction|
AddNoteSuccessAction | 
AddNoteErrorAction | 
GetTopicNotesAction |
GetTopicNotesSuccessAction |
GetTopicNotesErrorAction
;