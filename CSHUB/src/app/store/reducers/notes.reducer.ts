import { AddNote } from "../models/add-note.model";
import { Error } from "../models/error.model";
import { Note, SelectedNote } from "../models/note.model";
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
    selectedNote: SelectedNote,
    selectedCreatNewNote: boolean,
    loading: boolean
}

const intialState: NotesState = {
    noteToBeAdded: null,
    addedNote: null,
    addNoteError: null,
    allNotes: null,
    getTopicNotes: null,
    returnedTopicNotes: null,
    selectedCreatNewNote: true,
    selectedNote: null,
    
    getTopicNotesError: null,
    loading: false
};

export function NotesReducer(state: NotesState = intialState, action: NotesAction) {
    switch (action.type) {

        case NotesActionTypes.ADD_NOTE:
            return { ...state, noteToBeAdded: action.payload, loading: true };
        case NotesActionTypes.ADD_NOTE_SUCCESS:
            let prevTopicNotes = state.returnedTopicNotes
            prevTopicNotes.notes.unshift(action.payload)
            return { ...state, addedNote: action.payload, returnedTopicNotes:prevTopicNotes, loading: false };
        case NotesActionTypes.ADD_NOTE_ERROR:
            return { ...state, addNoteError: action.payload, loading: false };


        case NotesActionTypes.GET_TOPIC_NOTES:
            return { ...state, getTopicNotes: action.payload, loading: true };
        case NotesActionTypes.GET_TOPIC_NOTES_SUCCESS:
            return { ...state, returnedTopicNotes: action.payload, loading: false };
        case NotesActionTypes.GET_TOPIC_NOTES_ERROR:
            return { ...state, getTopicNotesError: action.payload, loading: false };
        
        case NotesActionTypes.SELECT_NOTE:
                return { ...state, selectedNote: action.payload, loading: false };

        default:
            return state;
    }
};