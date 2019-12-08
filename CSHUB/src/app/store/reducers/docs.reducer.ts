import { AddDoc, Doc, ReturnedMetaDocs, GetMetaDocs } from "../models/docs.model";
import { Error } from "../models/error.model";
import { DocsActionTypes, DocsAction, GetDocsErrorAction } from "../actions/docs.actions";
import { ACTIONS_SUBJECT_PROVIDERS } from "@ngrx/store/src/actions_subject";

export interface DocsState {
  docToBeAdded: AddDoc,
  addedDoc: Doc,
  addDocError: Error,
  getMetaDocs: GetMetaDocs,
  returnedMetaDocs: ReturnedMetaDocs,
  getMetaDocsError: Error,
  loading: boolean,
}

const intialState: DocsState = {
    docToBeAdded: null,
    addedDoc: null,
    addDocError: null,
    getMetaDocs: null,
    returnedMetaDocs: null,
    getMetaDocsError: null,
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
        let prevDocs = state.returnedMetaDocs;
        prevDocs.docs.unshift(action.payload);
      return {
        ...state,
        addedNote: action.payload,
        returnedMetaDocs: prevDocs,
        loading: false
      };
    case DocsActionTypes.ADD_DOC_ERROR:
      return { ...state, addDocError: action.payload, loading: false };

    
      case DocsActionTypes.GET_DOCS:
      return { ...state, getMetaDocs: action.payload, loading: true };
    case DocsActionTypes.GET_DOCS_SUCCESS:
      return {
        ...state,
        returnedMetaDocs: action.payload,
        loading: false
      };
    case DocsActionTypes.GET_DOCS_ERROR:
      return { ...state, getMetaDocsError: action.payload, loading: false };  



    default:
      return state;
  }
}
