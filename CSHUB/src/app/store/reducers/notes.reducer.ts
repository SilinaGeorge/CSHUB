import { AddNote } from "../models/add-note.model";
import { Error } from "../models/error.model";
import { Note } from "../models/note.model";
import { GetTopicNotes, ReturnedTopicNotes } from "../models/get-notes.model";
import { NotesActionTypes, NotesAction } from '../actions/notes.actions';

export interface NotesState {
    noteToBeAdded: AddNote,
    addedNote: Note,
    addNoteError: Error,
    allNotes: Array<Note>,
    getTopicNotes: GetTopicNotes,
    returnedTopicNotes: ReturnedTopicNotes,
    getTopicNotesError: Error,
    loading: boolean
}

const intialState: NotesState = {
    noteToBeAdded: null,
    addedNote: null,
    addNoteError: null,
    allNotes: null,
    getTopicNotes: null,
    returnedTopicNotes: null,
    getTopicNotesError: null,
    loading: false
};

export function NotesReducer(state: NotesState = intialState, action: NotesAction) {
    switch (action.type) {

        case NotesActionTypes.ADD_NOTE:
            return { ...state, noteToBeAdded: action.payload, loading: true };
        case NotesActionTypes.ADD_NOTE_SUCCESS:
            let prevAllNotes = state.allNotes
            prevAllNotes.push(action.payload)
            return { ...state, addedNote: action.payload, allNotes:prevAllNotes, loading: false };
        case NotesActionTypes.ADD_NOTE_ERROR:
            return { ...state, addNoteError: action.payload, loading: false };


        case NotesActionTypes.GET_TOPIC_NOTES:
            return { ...state, getTopicNotes: action.payload, loading: true };
        case NotesActionTypes.GET_TOPIC_NOTES_SUCCESS:
            return { ...state, returnedTopicNotes: action.payload, loading: false };
        case NotesActionTypes.GET_TOPIC_NOTES_ERROR:
            return { ...state, getTopicNotesError: action.payload, loading: false };

        default:
            return state;
    }
};