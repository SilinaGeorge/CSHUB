import { AddDoc, Doc, ReturnedMetaDocs, GetMetaDocs, DeleteDoc, UpdateDoc } from "../models/docs.model";
import { Error } from "../models/error.model";
import { DocsActionTypes, DocsAction, GetDocsErrorAction } from "../actions/docs.actions";
import { ACTIONS_SUBJECT_PROVIDERS } from "@ngrx/store/src/actions_subject";
import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap';

export interface DocsState {
  docToBeAdded: AddDoc,
  addedDoc: Doc,
  addDocError: Error,
  getMetaDocs: GetMetaDocs,
  returnedMetaDocs: ReturnedMetaDocs,
  getMetaDocsError: Error,
  docToBeDeleted: DeleteDoc,
  deletedDoc: Doc,
  deleteDocError: Error,
  docToUpdate: UpdateDoc,
  updatedDoc: Doc,
  updateDocError: Error,
  loading: boolean,
}

const intialState: DocsState = {
    docToBeAdded: null,
    addedDoc: null,
    addDocError: null,
    getMetaDocs: null,
    returnedMetaDocs: null,
    getMetaDocsError: null,
    docToBeDeleted: null,
    deletedDoc: null,
    deleteDocError: null,
    docToUpdate: null,
    updatedDoc: null,
    updateDocError: null,
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
      return { ...state, getMetaDocs: action.payload, loading: true, returnedMetaDocs:null, getMetaDocsError:null };
    case DocsActionTypes.GET_DOCS_SUCCESS:
      return {
        ...state,
        returnedMetaDocs: action.payload,
        getMetaDocsError: null,
        loading: false
      };
    case DocsActionTypes.GET_DOCS_ERROR:
      return { ...state, getMetaDocsError: action.payload, loading: false, returnedMetaDocs:null };  



      case DocsActionTypes.DELETE_DOC:
        return { ...state, docToBeDeleted: action.payload, loading: true };
      case DocsActionTypes.DELETE_DOC_SUCCESS:
        let prevDocDelete = state.returnedMetaDocs;
        let index = prevDocDelete.docs.findIndex(
          note => note._id == action.payload._id
        );
        prevDocDelete.docs.splice(index, 1);
        return {
          ...state,
          deletedNote: action.payload,
          returnedMetaDocs: prevDocDelete,
          loading: false
        };
      case DocsActionTypes.DELETE_DOC_ERROR:
        return { ...state, deleteDocError: action.payload, loading: false };

      
        case DocsActionTypes.UPDATE_DOC:
          return { ...state, docToUpdate: action.payload, loading: true };
        case DocsActionTypes.UPDATE_DOC_SUCCESS:
          let prevDocUpdate = state.returnedMetaDocs;
          let indexUpdate = prevDocUpdate.docs.findIndex(
            note => note._id == action.payload._id
          );
          prevDocUpdate.docs[indexUpdate] = action.payload;
          return {
            ...state,
            updatedDoc: action.payload,
            returnedMetaDocs: prevDocUpdate,
            loading: false
          };
        case DocsActionTypes.UPDATE_DOC_ERROR:
          return { ...state, updateDocError: action.payload, loading: false };


    default:
      return state;
  }
}
