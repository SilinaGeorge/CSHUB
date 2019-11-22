import { AddNote } from "../models/add-note.model";
import { Error } from "../models/error.model";
import { Note } from "../models/note.model";
import { NotesActionTypes, NotesAction } from '../actions/notes.actions';

export interface NotesState {
    noteToBeAdded: AddNote,
    addedNote: Note,
    addNoteError: Error,
    allNotes: Array<Note>
    loading: boolean
}

const intialState: NotesState = {
    noteToBeAdded: null,
    addedNote: null,
    addNoteError: null,
    allNotes: null,
    loading: false
};

export function UserReducer(state: NotesState = intialState, action: NotesAction) {
    switch (action.type) {

        case NotesActionTypes.ADD_NOTE:
            return { ...state, noteToBeAdded: action.payload, loading: true };
        case NotesActionTypes.ADD_NOTE_SUCCESS:
            let prevAllNotes = state.allNotes
            prevAllNotes.push(action.payload)
            return { ...state, addedNote: action.payload, allNotes:prevAllNotes, loading: false };
        case NotesActionTypes.ADD_NOTE_ERROR:
            return { ...state, addNoteError: action.payload, loading: false };

        default:
            return state;
    }
};