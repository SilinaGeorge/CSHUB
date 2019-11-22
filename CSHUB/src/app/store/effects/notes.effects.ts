import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { AddNoteAction, AddNoteErrorAction, AddNoteSuccessAction, NotesActionTypes } from '../actions/notes.actions';
import { NotesService } from '../../services/notes.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class UsersEffects {

    @Effect() addNote = this.actions$
        .pipe(
            ofType<AddNoteAction>(NotesActionTypes.ADD_NOTE),
            mergeMap(
                data => this.noteService.AddNote(data.payload)
                    .pipe(
                        map(data => {

                            return new AddNoteSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new AddNoteErrorAction(error.error))
                        }
                        )
                    )
            )
        )

    
    constructor(private actions$: Actions, private noteService: NotesService) { }

}