import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { Observable, Subscription } from 'rxjs';
import { Spotify } from '../store/models/spotify.model';
import { Error } from '../store/models/error.model';
import { UpdateSpotifyAction, GetSpotifyAction } from '../store/actions/user.actions';
import { take } from 'rxjs/operators';


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
  userID: string;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private store: Store<AppState>) {
    // default playlist
    let sanatizedUrl= this.sanitizer.sanitize(SecurityContext.URL, "https://open.spotify.com/embed/playlist/37i9dQZF1DX9sIqqvKsjG8");
    this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanatizedUrl);
    
  }

  ngOnInit() {
    this.spotifyFormGroup = this.fb.group({
      spotifyurl: ['', [
        Validators.required,
        Validators.pattern("https://open.spotify.com/(album|playlist|station)/[a-zA-Z0-9/=?_\-]*")
      ]],

    });
    
    this.subscription = this.store.select(store => store.user.user).pipe(take(1)).subscribe(state =>   {
      if (state){
        this.userID = state._id;
      }
    });

    // get the user's saved playlist 
    this.store.dispatch(new GetSpotifyAction({_id:this.userID}));
   
    this.subscription = this.store.select(store => store.user.returnedSpotify).subscribe(state =>   {
      if (state && state.spotifyurl){
        this.url = state.spotifyurl;
        if (this.url){

          let sanatizedUrl= this.sanitizer.sanitize(SecurityContext.URL, this.url);
          this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanatizedUrl);
        }
        // set default playlist
        else{
    
          let sanatizedUrl= this.sanitizer.sanitize(SecurityContext.URL, "https://open.spotify.com/embed/playlist/37i9dQZF1DX9sIqqvKsjG8");
          this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanatizedUrl);
    
        }
      }
      }); 


  }


  get spotifyurl() {
    return String (this.spotifyFormGroup.get('spotifyurl').value);
  }

  // close spotify modal 
  close(){
    var spotifypopup = document.getElementById("spotify");
    spotifypopup.style.display = "none"; 
  }

  // upload spotify playlist
  onUpload(){
    try{
      let embedURL = this.spotifyurl.substr(0, 25) + "embed\/" + this.spotifyurl.substr(25);
      let uploadSpotify: Spotify= {_id: this.userID, spotifyurl: embedURL};
      
      // save user's upload 
      this.loading$ = this.store.select(store => store.user.spotifyLoading)
      this.store.dispatch(new UpdateSpotifyAction(uploadSpotify));
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

