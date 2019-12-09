import { AddNote } from "../models/add-note.model";
import { Error } from "../models/error.model";
import {
  Note,
  SelectedNote,
  DeleteNote,
  UpdateNote
} from "../models/note.model";
import { GetTopicNotes, ReturnedTopicNotes } from "../models/get-notes.model";
import { NotesActionTypes, NotesAction } from "../actions/notes.actions";
import { ACTIONS_SUBJECT_PROVIDERS } from "@ngrx/store/src/actions_subject";

export interface NotesState {
  noteToBeAdded: AddNote;
  addedNote: Note;
  addNoteError: Error;
  noteToDelete: DeleteNote;
  deletedNote: Note;
  deleteNoteError: Error;
  noteToUpdate: UpdateNote;
  updatedNote: Note;
  updateNoteError: Error;
  allNotes: Array<Note>;
  getTopicNotes: GetTopicNotes;
  returnedTopicNotes: ReturnedTopicNotes;
  getTopicNotesError: Error;
  selectedNote: SelectedNote;
  selectedCreatNewNote: boolean;
  loading: boolean;
}

const intialState: NotesState = {
  noteToBeAdded: null,
  addedNote: null,
  addNoteError: null,
  noteToDelete: null,
  deletedNote: null,
  deleteNoteError: null,
  noteToUpdate: null,
  updatedNote: null,
  updateNoteError: null,
  allNotes: null,
  getTopicNotes: null,
  returnedTopicNotes: null,
  selectedCreatNewNote: true,
  selectedNote: null,

  getTopicNotesError: null,
  loading: false
};

export function NotesReducer(
  state: NotesState = intialState,
  action: NotesAction
) {
  switch (action.type) {
    case NotesActionTypes.ADD_NOTE:
      return { ...state, noteToBeAdded: action.payload, loading: true };
    case NotesActionTypes.ADD_NOTE_SUCCESS:
      let prevTopicNotes = state.returnedTopicNotes;
      prevTopicNotes.notes.unshift(action.payload);
      return {
        ...state,
        addedNote: action.payload,
        returnedTopicNotes: prevTopicNotes,
        loading: false
      };
    case NotesActionTypes.ADD_NOTE_ERROR:
      return { ...state, addNoteError: action.payload, loading: false };


    case NotesActionTypes.DELETE_NOTE:
      return { ...state, noteToDelete: action.payload, loading: true };
    case NotesActionTypes.DELETE_NOTE_SUCCESS:
      let prevTopicNotesDelete = state.returnedTopicNotes;
      let index = prevTopicNotesDelete.notes.findIndex(
        note => note._id == action.payload._id
      );
      prevTopicNotesDelete.notes.splice(index, 1);
      return {
        ...state,
        deletedNote: action.payload,
        returnedTopicNotes: prevTopicNotesDelete,
        loading: false
      };
    case NotesActionTypes.DELETE_NOTE_ERROR:
      return { ...state, addNoteError: action.payload, loading: false };


    case NotesActionTypes.UPDATE_NOTE:
      return { ...state, noteToUpdate: action.payload, loading: true };
    case NotesActionTypes.UPDATE_NOTE_SUCCESS:
      let prevTopicNotesUpdate = state.returnedTopicNotes;
      let indexUpdate = prevTopicNotesUpdate.notes.findIndex(
        note => note._id == action.payload._id
      );
      prevTopicNotesUpdate.notes[indexUpdate] = action.payload;
      return {
        ...state,
        updatedNote: action.payload,
        returnedTopicNotes: prevTopicNotesUpdate,
        loading: false
      };
    case NotesActionTypes.UPDATE_NOTE_ERROR:
      return { ...state, updateNoteError: action.payload, loading: false };


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
}
