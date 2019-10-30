import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError } from 'rxjs/operators'
import * as WidgetActions from '../actions/widget.actions';
import { WidgetService } from '../../services/widget.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class WidgetEffects {

    @Effect() UpdateSpotify = this.actions$
        .pipe(
            ofType<WidgetActions.UpdateSpotifyAction>(WidgetActions.WidgetActionTypes.UPDATE_SPOTIFY),
            mergeMap(
                data => this.widgetService.PatchSpotify(data.payload)
                    .pipe(
                        map(data => {
                            return new WidgetActions.UpdateSpotifySuccessAction(data)
                        }),
                        catchError((error) => {
                            return of(new WidgetActions.UpdateSpotifyErrorAction(error.error))
                        }
                        )
                    )
            )
        )
    constructor(private actions$: Actions, private widgetService: WidgetService) { }

}