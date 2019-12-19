import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { DocsService } from '../../services/docs.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AddDocAction, DocsActionTypes, AddDocSuccessAction, AddDocErrorAction, GetDocsAction, GetDocsSuccessAction, GetDocsErrorAction, DeleteDocSuccessAction, DeleteDocErrorAction, DeleteDocAction, UpdateDocAction, UpdateDocSuccessAction, UpdateDocErrorAction } from '../actions/docs.actions';


@Injectable()
export class DocsEffects {

    @Effect() addDoc= this.actions$
        .pipe(
            ofType<AddDocAction>(DocsActionTypes.ADD_DOC),
            mergeMap(
                data => this.docsService.AddDoc(data.payload)
                    .pipe(
                        map(data => {

                            return new AddDocSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new AddDocErrorAction(error.error))
                        }
                        )
                    )
            )
        )

        @Effect() getDocs = this.actions$
        .pipe(
            ofType<GetDocsAction>(DocsActionTypes.GET_DOCS),
            mergeMap(
                data => this.docsService.GetDocs(data.payload)
                    .pipe(
                        map(data => {

                            return new GetDocsSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new GetDocsErrorAction(error.error))
                        }
                        )
                    )
            )
        )

        @Effect() deleteDoc = this.actions$
        .pipe(
            ofType<DeleteDocAction>(DocsActionTypes.DELETE_DOC),
            mergeMap(
                data => this.docsService.DeleteDoc(data.payload)
                    .pipe(
                        map(data => {

                            return new DeleteDocSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new DeleteDocErrorAction(error.error))
                        }
                        )
                    )
            )
        )


        @Effect() updateDoc = this.actions$
        .pipe(
            ofType<UpdateDocAction>(DocsActionTypes.UPDATE_DOC),
            mergeMap(
                data => this.docsService.UpdateDoc(data.payload)
                    .pipe(
                        map(data => {

                            return new UpdateDocSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new UpdateDocErrorAction(error.error))
                        }
                        )
                    )
            )
        )

    
    constructor(private actions$: Actions, private docsService: DocsService) { }

}