import { Action } from '@ngrx/store';
import { AddDoc, Doc } from '../models/docs.model';

export enum DocsActionTypes{
    ADD_DOC = '[DOC] Add',
    ADD_DOC_SUCCESS = '[DOC] Add Success',
    ADD_DOC_ERROR = '[DOC] Add Error',
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


export type DocsAction = 
AddDocAction|
AddDocSuccessAction | 
AddDocErrorAction
;