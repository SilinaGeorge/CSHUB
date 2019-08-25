import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl, SafeValue } from '@angular/platform-browser';


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

 
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://open.spotify.com/embed/playlist/37i9dQZF1CAjTirSpYapUx");
   }

  ngOnInit() {
    this.spotifyFormGroup = this.fb.group({
      spotifyurl: ['', [
        Validators.required,
        Validators.pattern("https://open.spotify.com/(album|playlist|station)/[a-zA-Z0-9/=?]*")
      ]],

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
      this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanatizedUrl);



    }
    catch(ex){
      this.errorHTML = `<li>An error has occured</li>`
    }
  }
}
