import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Spotify, GetSpotify } from '../store/models/spotify.model';
import { Notification, GetNotifications, AllNotifications, DeleteNotifs } from '../store/models/notification.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private URL = environment.url + "/widgets";

  constructor(private http: HttpClient) { }

  PatchSpotify(spotifyData: Spotify) {
 
    return this.http.patch<Spotify>(`${this.URL}/spotify/${spotifyData._id}`, spotifyData);
  };

  GetSpotify(spotifyData: GetSpotify) {
 
    return this.http.get<Spotify>(`${this.URL}/spotify/${spotifyData._id}`);
  };

 
  PutNotif(notifData: Notification)
  {
 
    return this.http.put<Notification>(`${this.URL}/notif/${notifData._id}`, notifData);
  };

  DeleteNotifs(notifData: DeleteNotifs)
  {
 
    return this.http.patch<DeleteNotifs>(`${this.URL}/notifs/delete/${notifData._id}`, notifData);
  };

  GetNotifs(notifData: GetNotifications) {
 
    return this.http.get<AllNotifications>(`${this.URL}/notifs/${notifData._id}`);
  };

}



