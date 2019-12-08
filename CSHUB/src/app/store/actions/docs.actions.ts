import { Action } from '@ngrx/store';
import { AddDoc, Doc, GetMetaDocs, ReturnedMetaDocs } from '../models/docs.model';

export enum DocsActionTypes{
    ADD_DOC = '[DOC] Add',
    ADD_DOC_SUCCESS = '[DOC] Add Success',
    ADD_DOC_ERROR = '[DOC] Add Error',

    GET_DOCS = '[DOC] Get',
    GET_DOCS_SUCCESS = '[DOC] Get Success',
    GET_DOCS_ERROR = '[DOC] Get Error',


}

export class AddDocAction implements Action{
    readonly type = DocsActionTypes.ADD_DOC;
    constructor(public payload: AddDoc){};
}

export class AddDocSuccessAction implements Action{
    readonly type = DocsActionTypes.ADD_DOC_SUCCESS;
    constructor(public payload: Doc){};
}
export class AddDocErrorAction implements Action{
    readonly type = DocsActionTypes.ADD_DOC_ERROR;
    constructor(public payload: Error){};
}


export class GetDocsAction implements Action{
    readonly type = DocsActionTypes.GET_DOCS;
    constructor(public payload: GetMetaDocs){};
}

export class GetDocsSuccessAction implements Action{
    readonly type = DocsActionTypes.GET_DOCS_SUCCESS;
    constructor(public payload: ReturnedMetaDocs){};
}
export class GetDocsErrorAction implements Action{
    readonly type = DocsActionTypes.GET_DOCS_ERROR;
    constructor(public payload: Error){};
}

export type DocsAction = 
AddDocAction|
AddDocSuccessAction |  
AddDocErrorAction|
GetDocsAction |
GetDocsSuccessAction |
GetDocsErrorAction
;