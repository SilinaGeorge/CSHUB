import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Spotify } from '../store/models/spotify.model';
import { Notification } from '../store/models/notification.model';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private URL = "https://localhost:4200/widgets";

  constructor(private http: HttpClient) { }

  PatchSpotify(spotifyData: Spotify) {
 
    return this.http.patch<Spotify>(`${this.URL}/spotify/${spotifyData._id}`, spotifyData)
      .pipe(delay(2000))

      ;
  };

 
  PutNotif(notifData: Notification)
  {
 
    return this.http.put<Notification>(`${this.URL}/notif/${notifData._id}`, notifData)
      .pipe(delay(2000))

      ;
  };

  DeleteNotif(notifData: Notification)
  {
 
    return this.http.patch<Notification>(`${this.URL}/notif/delete/${notifData._id}`, notifData)
      .pipe(delay(2000))

      ;
  };

}



