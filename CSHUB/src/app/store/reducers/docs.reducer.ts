import { AddDoc, Doc } from "../models/docs.model";
import { Error } from "../models/error.model";
import { DocsActionTypes, DocsAction } from "../actions/docs.actions";
import { ACTIONS_SUBJECT_PROVIDERS } from "@ngrx/store/src/actions_subject";

export interface DocsState {
  docToBeAdded: AddDoc,
  addedDoc: Doc,
  addDocError: Error,
  loading: boolean,
}

const intialState: DocsState = {
    docToBeAdded: null,
    addedDoc: null,
    addDocError: null,
    loading: false
};

export function DocsReducer(
  state: DocsState = intialState,
  action: DocsAction
) {
  switch (action.type) {
    case DocsActionTypes.ADD_DOC:
      return { ...state, docToBeAdded: action.payload, loading: true };
    case DocsActionTypes.ADD_DOC_SUCCESS:
      return {
        ...state,
        addedNote: action.payload,
        loading: false
      };
    case DocsActionTypes.ADD_DOC_ERROR:
      return { ...state, addDocError: action.payload, loading: false };



    default:
      return state;
  }
}
