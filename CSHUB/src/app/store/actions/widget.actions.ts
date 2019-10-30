
import { Action } from '@ngrx/store';
import { Error } from '../models/error.model';
import { Spotify } from '../models/spotify.model';


export enum WidgetActionTypes{
    UPDATE_SPOTIFY = '[USER] Update Spotify',
    UPDATE_SPOTIFY_SUCCESS = '[USER] Update Spotify Success',
    UPDATE_SPOTIFY_ERROR = '[USER] Update Spotify Error',
}

export class UpdateSpotifyAction implements Action{
    readonly type = WidgetActionTypes.UPDATE_SPOTIFY;
    constructor(public payload: Spotify){};
}
export class UpdateSpotifySuccessAction implements Action{
    readonly type = WidgetActionTypes.UPDATE_SPOTIFY_SUCCESS;
    constructor(public payload: Spotify){};
}
export class UpdateSpotifyErrorAction implements Action{
    readonly type = WidgetActionTypes.UPDATE_SPOTIFY_ERROR;
    constructor(public payload: Error){};
}


export type WidgetAction = 
UpdateSpotifyAction |
UpdateSpotifySuccessAction |
UpdateSpotifyErrorAction 
;