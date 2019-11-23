import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { AddNoteAction, AddNoteErrorAction, AddNoteSuccessAction, NotesActionTypes, GetTopicNotesAction, GetTopicNotesErrorAction, GetTopicNotesSuccessAction } from '../actions/notes.actions';
import { NotesService } from '../../services/notes.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class NotesEffects {

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

        @Effect() getTopicNotes = this.actions$
        .pipe(
            ofType<GetTopicNotesAction>(NotesActionTypes.GET_TOPIC_NOTES),
            mergeMap(
                data => this.noteService.GetTopicNotes(data.payload)
                    .pipe(
                        map(data => {

                            return new GetTopicNotesSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new GetTopicNotesErrorAction(error.error))
                        }
                        )
                    )
            )
        )
    
    constructor(private actions$: Actions, private noteService: NotesService) { }

}