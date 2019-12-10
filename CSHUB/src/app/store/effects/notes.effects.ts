import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { AddNoteAction, 
    AddNoteErrorAction, 
    AddNoteSuccessAction, 
    NotesActionTypes, 
    GetNotesAction, 
    GetNotesErrorAction, 
    GetNotesSuccessAction,
DeleteNoteAction,
DeleteNoteErrorAction,
DeleteNoteSuccessAction,
updateNoteAction,
updateNoteErrorAction,
updateNoteSuccessAction } from '../actions/notes.actions';
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

        @Effect() deleteNote = this.actions$
        .pipe(
            ofType<DeleteNoteAction>(NotesActionTypes.DELETE_NOTE),
            mergeMap(
                data => this.noteService.DeleteNote(data.payload)
                    .pipe(
                        map(data => {

                            return new DeleteNoteSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new DeleteNoteErrorAction(error.error))
                        }
                        )
                    )
            )
        )

        @Effect() updateNote = this.actions$
        .pipe(
            ofType<updateNoteAction>(NotesActionTypes.UPDATE_NOTE),
            mergeMap(
                data => this.noteService.UpdateNote(data.payload)
                    .pipe(
                        map(data => {

                            return new updateNoteSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new updateNoteErrorAction(error.error))
                        }
                        )
                    )
            )
        )

        @Effect() getTopicNotes = this.actions$
        .pipe(
            ofType<GetNotesAction>(NotesActionTypes.GET_TOPIC_NOTES),
            mergeMap(
                data => this.noteService.GetNotes(data.payload)
                    .pipe(
                        map(data => {

                            return new GetNotesSuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new GetNotesErrorAction(error.error))
                        }
                        )
                    )
            )
        )
    
    constructor(private actions$: Actions, private noteService: NotesService) { }

}