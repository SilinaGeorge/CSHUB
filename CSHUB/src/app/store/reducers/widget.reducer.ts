import { Spotify } from "../models/spotify.model";
import { Error } from "../models/error.model";
import { WidgetAction, WidgetActionTypes } from '../actions/widget.actions';

export interface WidgetState {
    spotify: Spotify,
    spotifyError: Error,
    loading: boolean,
}

const intialState: WidgetState = {
    spotify: null,
    spotifyError: null,
    loading: false
};

export function WidgetReducer(state: WidgetState = intialState, action: WidgetAction) {
    switch (action.type) {
        case WidgetActionTypes.UPDATE_SPOTIFY:
            return { ...state, spotify: action.payload, loading: true };
        case WidgetActionTypes.UPDATE_SPOTIFY_SUCCESS:
            return { ...state, spotify: action.payload, loading: false };
        case WidgetActionTypes.UPDATE_SPOTIFY_ERROR:
            return { ...state, spotifyError: action.payload, loading: false };
        default:
            return state;
    }
};

export const getSpotify= (state: WidgetState) => state.spotify
export const getLoading = (state: WidgetState) => state.loading