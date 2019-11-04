import { User } from "../models/user.model";
import { Error } from "../models/error.model";
import { Spotify } from "../models/spotify.model";
import { Auth, SocialMediaAuth } from "../models/auth.model";
import { SignUpUser } from "../models/sign-up-user.model";
import { Notification } from "../models/notification.model";
import { UserActionTypes, UserAction } from '../actions/user.actions';

export interface UserState {
    user: User,
    auth: Auth,
    socialMediaAuth: SocialMediaAuth,
    signUpUser: SignUpUser,
    signupError: Error,
    loginError: Error,
    getSocialUserError: Error,
    spotify: Spotify,
    spotifyError: Error,
    notification: Notification,
    notificationSuccess: boolean,
    notificationError: Error,
    deleteNotification: Notification,
    deleteNotificationError: Error,
    loading: boolean
}

const intialState: UserState = {
    user: null,
    auth: null,
    socialMediaAuth: null,
    signUpUser: null,
    signupError: null,
    loginError: null,
    getSocialUserError: null,
    spotify: null,
    spotifyError: null,
    notification: null,
    notificationError: null,
    notificationSuccess: false,
    deleteNotification: null,
    deleteNotificationError: null,
    loading: false
};

export function UserReducer(state: UserState = intialState, action: UserAction) {
    switch (action.type) {

        case UserActionTypes.LOGIN_USER:
            return { ...state, auth: action.payload, loading: true };
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case UserActionTypes.LOGIN_USER_ERROR:
            return { ...state, loginError: action.payload, loading: false };

        case UserActionTypes.SIGNUP_USER:
            return { ...state, signUpUser: action.payload, loading: true };
        case UserActionTypes.SIGNUP_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case UserActionTypes.SIGNUP_USER_ERROR:
            return { ...state, signupError: action.payload, loading: false };

        case UserActionTypes.GET_SOCIAL_USER:
            return { ...state, loading: true,  socialMediaAuth: action.payload };
        case UserActionTypes.GET_SOCIAL_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case UserActionTypes.GET_SOCIAL_USER_ERROR:
            return { ...state, getSocialUserError: action.payload, loading: false };

        case UserActionTypes.UPDATE_SPOTIFY:
            return { ...state, spotify: action.payload, loading: true };
        case UserActionTypes.UPDATE_SPOTIFY_SUCCESS:
            let stateUser = {...state.user}
            stateUser.spotifyurl = action.payload.spotifyurl;
            return { ...state, user: stateUser, spotifyError: null, loading: false };
        case UserActionTypes.UPDATE_SPOTIFY_ERROR:
            return { ...state, spotifyError: action.payload, loading: false };

        case UserActionTypes.ADD_NOTIF:
                return { ...state, notification: action.payload, loading: true };
        case UserActionTypes.ADD_NOTIF_SUCCESS:
            let stateUser2 = {...state.user};
            stateUser2.notifications.push(action.payload.datetime);
            return { ...state, user: stateUser2, notificationError:null, notificationSuccess: true, loading: false };
        case UserActionTypes.ADD_NOTIF_ERROR:
            return { ...state, notificationError: action.payload,notificationSuccess: false, loading: false };
        
        case UserActionTypes.DELETE_NOTIF:
                return { ...state, deleteNotification: action.payload, loading: true };
        case UserActionTypes.DELETE_NOTIF_SUCCESS:
            let delUserNotif = {...state.user};
            var index = delUserNotif.notifications.indexOf(action.payload.datetime);
            delUserNotif.notifications.splice(index, 1);
            return { ...state, user: delUserNotif, deleteNotificationError:null, loading: false };
        case UserActionTypes.DELETE_NOTIF_ERROR:
            return { ...state, deleteNotificationError: action.payload, loading: false };
        
        default:
            return state;
    }
};

export const getUser = (state: UserState) => state.user
export const getLoading = (state: UserState) => state.loading