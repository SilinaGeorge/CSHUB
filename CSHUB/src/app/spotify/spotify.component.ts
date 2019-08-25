import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SpotifyPopupComponent } from '../spotify-popup/spotify-popup.component';



@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  openModal(){
     var spotifypopup = document.getElementById("spotify");
    if (spotifypopup.style.display === "none") {
      spotifypopup.style.display = "block";
    } else {
      spotifypopup.style.display = "none";
    } 

    //this.dialog.open(SpotifyPopupComponent,);
  }

}
