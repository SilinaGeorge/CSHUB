import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl, SafeValue } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';


@Component({
  selector: 'app-spotify-popup',
  templateUrl: './spotify-popup.component.html',
  styleUrls: ['./spotify-popup.component.css']
})
export class SpotifyPopupComponent implements OnInit {

  spotifyFormGroup: FormGroup;

  srcUrl: SafeResourceUrl;
  errorHTML: string;
  closeResult: string;
  user$: Observable<User>;

 
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private store: Store<AppState>) {}

  ngOnInit() {
    this.spotifyFormGroup = this.fb.group({
      spotifyurl: ['', [
        Validators.required,
        Validators.pattern("https://open.spotify.com/(album|playlist|station)/[a-zA-Z0-9/=?]*")
      ]],

    });
    
   /*  this.store.select(store => store.user.user).subscribe(state =>   {
      if (state.email) this.url = state.email;
      }); */
    this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://open.spotify.com/embed/playlist/37i9dQZF1CAjTirSpYapUx");
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
      this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanatizedUrl);



    }
    catch(ex){
      this.errorHTML = `<li>An error has occured</li>`
    }
  }
}
