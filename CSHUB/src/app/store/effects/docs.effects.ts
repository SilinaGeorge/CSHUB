import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { DocsService } from '../../services/docs.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AddDocAction, DocsActionTypes, AddDocSuccessAction, AddDocErrorAction } from '../actions/docs.actions';


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


    
    constructor(private actions$: Actions, private docsService: DocsService) { }

}