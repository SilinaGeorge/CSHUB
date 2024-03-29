import { User, GetSpaceLeft, SpaceLeft } from "../models/user.model";
import { Error } from "../models/error.model";
import { Spotify, GetSpotify } from "../models/spotify.model";
import { Auth, SocialMediaAuth } from "../models/auth.model";
import { SignUpUser } from "../models/sign-up-user.model";
import { Notification, GetNotifications, AllNotifications, DeleteNotifs } from "../models/notification.model";
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
    deleteNotifications: DeleteNotifs,
    deleteNotificationsError: Error,
    deletedNofications: DeleteNotifs,
    getNotifs: GetNotifications,
    returnedNotifs: AllNotifications,
    getNotifsError: Error,
    getSpotify: GetSpotify,
    returnedSpotify: Spotify,
    getSpotifyError: Error,
    getSpaceLeft: GetSpaceLeft,
    returnedSpaceLeft: SpaceLeft,
    getSpaceLeftError: Error,
    loading: boolean,
    notifLoading:boolean,
    spotifyLoading:boolean,
}

function findUser(){
    let localUser = sessionStorage.getItem('user')
    if (localUser) return JSON.parse(localUser)
    else return null
}


const intialState: UserState = {
    user: findUser(),
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
    deleteNotifications: null,
    deleteNotificationsError: null,
    deletedNofications: null,
    getNotifs: null,
    returnedNotifs: null,
    getNotifsError: null,
    getSpotify: null,
    returnedSpotify: null,
    getSpotifyError: null,
    getSpaceLeft: null,
    returnedSpaceLeft: null,
    getSpaceLeftError: null,
    loading: false,
    notifLoading:false,
    spotifyLoading:false,
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
            let prevReturnedSpotify = {...state.returnedSpotify}
            prevReturnedSpotify.spotifyurl = action.payload.spotifyurl;
            return { ...state, returnedSpotify: prevReturnedSpotify, spotifyError: null, loading: false };
        case UserActionTypes.UPDATE_SPOTIFY_ERROR:
            return { ...state, spotifyError: action.payload, loading: false };

        case UserActionTypes.ADD_NOTIF:
                return { ...state, notification: action.payload, loading: true, notificationError:null, notificationSuccess: null };
        case UserActionTypes.ADD_NOTIF_SUCCESS:
            let prevReturnedNotifs = {...state.returnedNotifs};
            prevReturnedNotifs.notifications.push(action.payload.datetime);
            return { ...state, returnedNotifs:prevReturnedNotifs, notificationError:null, notificationSuccess: true, loading: false };
        case UserActionTypes.ADD_NOTIF_ERROR:
            return { ...state, notificationError: action.payload,notificationSuccess: false, loading: false };
        
        case UserActionTypes.DELETE_NOTIFS:
                return { ...state, deleteNotifications: action.payload, loading: true, deletedNofications: null, deleteNotificationsError: null };
        case UserActionTypes.DELETE_NOTIFS_SUCCESS:
            let prevReturnedNotifsDel = {...state.returnedNotifs};
            action.payload.datetimes.forEach(dt=>{
                var index = prevReturnedNotifsDel.notifications.indexOf(dt);
                prevReturnedNotifsDel.notifications.splice(index, 1);
            })
            
            return { ...state, returnedNotifs: prevReturnedNotifsDel, deletedNofications:action.payload,deleteNotificationsError:null, loading: false };
        case UserActionTypes.DELETE_NOTIFS_ERROR:
            return { ...state, deleteNotificationsError: action.payload,deletedNofications:null, loading: false };
        
        case UserActionTypes.LOGOUT_USER_SUCCESS:
            sessionStorage.clear()
            return { intialState};

        case UserActionTypes.GET_NOTIFS:
            return { ...state, notifLoading: true,  getNotifs: action.payload, returnedNotifs:null, getNotifsError: null };
        case UserActionTypes.GET_NOTIFS_SUCCESS:
            return { ...state, returnedNotifs: action.payload, notifLoading: false, getNotifsError:null };
        case UserActionTypes.GET_NOTIFS_ERROR:
            return { ...state, getNotifsError: action.payload, notifLoading: false, returnedNotifs: null };
        

        case UserActionTypes.GET_SPOTIFY:
            return { ...state, spotifyLoading: true,  getSpotify: action.payload, returnedSpotify:null, getSpotifyError: null };
        case UserActionTypes.GET_SPOTIFY_SUCCESS:
            return { ...state, returnedSpotify: action.payload, spotifyLoading: false, getSpotifyError:null };
        case UserActionTypes.GET_SPOTIFY_ERROR:
            return { ...state, getSpotifyError: action.payload, spotifyLoading: false, returnedSpotify: null };
       
        case UserActionTypes.GET_SPACE_LEFT:
            return { ...state, loading: true,  getSpaceLeft: action.payload, getSpaceLeftError: null };
        case UserActionTypes.GET_SPACE_LEFT_SUCCESS:
            return { ...state, returnedSpaceLeft: action.payload, loading: false, getSpaceLeftError:null };
        case UserActionTypes.GET_SPACE_LEFT_ERROR:
            return { ...state, getSpaceLeftError: action.payload, loading: false, returnedSpaceLeft: null };
          
        default:
            return state;
    }
};

export const getUser = (state: UserState) => state.user
export const getLoading = (state: UserState) => state.loading