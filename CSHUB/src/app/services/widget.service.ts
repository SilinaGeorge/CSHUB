import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Spotify } from '../store/models/spotify.model';
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

}



