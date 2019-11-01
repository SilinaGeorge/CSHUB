import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { Observable, Subscription } from 'rxjs';
import { Spotify } from '../store/models/spotify.model';
import { Error } from '../store/models/error.model';
import { UpdateSpotifyAction } from '../store/actions/user.actions';


@Component({
  selector: 'app-spotify-popup',
  templateUrl: './spotify-popup.component.html',
  styleUrls: ['./spotify-popup.component.css']
})
export class SpotifyPopupComponent implements OnInit {

  spotifyFormGroup: FormGroup;
  subscription: Subscription;

  srcUrl: SafeResourceUrl;
  errorHTML: string;
  closeResult: string;
  url: string;
  spotify$: Observable<Spotify>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  spotify: Spotify= {_id: null, spotifyurl: null};;
  userID: string;

 
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private store: Store<AppState>) {}

  ngOnInit() {
    this.spotifyFormGroup = this.fb.group({
      spotifyurl: ['', [
        Validators.required,
        Validators.pattern("https://open.spotify.com/(album|playlist|station)/[a-zA-Z0-9/=?]*")
      ]],

    });
    this.subscription = this.store.select(store => store.user.user).subscribe(state =>   {
      if (state){
        this.url = state.spotifyurl;
        this.userID = state._id;
      }
      if (this.url){

        let sanatizedUrl= this.sanitizer.sanitize(SecurityContext.URL, this.url);
        this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanatizedUrl);
      }
      else{
  
        let sanatizedUrl= this.sanitizer.sanitize(SecurityContext.URL, "https://open.spotify.com/embed/playlist/37i9dQZF1DX9sIqqvKsjG8");
        this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanatizedUrl);
  
      }
      }); 


  }


  get spotifyurl() {
    return String (this.spotifyFormGroup.get('spotifyurl').value);
  }

  close(){
     var spotifypopup = document.getElementById("spotify");
    spotifypopup.style.display = "none"; 
    
    
  }

  onUpload(){
    try{
/*       let index = this.spotifyurl.indexOf("https:\/\/open.spotify.com\/")
      console.log(index); */
      let embedURL = this.spotifyurl.substr(0, 25) + "embed\/" + this.spotifyurl.substr(25);
     // console.log(embedURL);
      let sanatizedUrl= this.sanitizer.sanitize(SecurityContext.URL, embedURL);
      //this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanatizedUrl);


      this.spotify.spotifyurl = embedURL;
      this.spotify._id = this.userID;
  
      this.loading$ = this.store.select(store => store.user.loading)
      this.store.dispatch(new UpdateSpotifyAction(this.spotify));
      this.error$ = this.store.select(store => store.user.spotifyError)
  
    }
    catch(ex){
      this.errorHTML = `<li>` + ex+ `An error has occured: unable to upload spotify url</li>`
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();

  }
}

