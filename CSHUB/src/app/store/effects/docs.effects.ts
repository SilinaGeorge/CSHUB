import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { DocsService } from '../../services/docs.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AddDocAction, DocsActionTypes, AddDocSuccessAction, AddDocErrorAction, GetDocsAction, GetDocsSuccessAction, GetDocsErrorAction } from '../actions/docs.actions';


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


    
    constructor(private actions$: Actions, private docsService: DocsService) { }

}