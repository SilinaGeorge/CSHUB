import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spotify-popup',
  templateUrl: './spotify-popup.component.html',
  styleUrls: ['./spotify-popup.component.css']
})
export class SpotifyPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  close(){
    var spotifypopup = document.getElementById("spotify");
    spotifypopup.style.display = "none";
    
  }
}
