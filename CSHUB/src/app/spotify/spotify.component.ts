import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  openModal(){
    var spotifypopup = document.getElementById("spotify");
    if (spotifypopup.style.display === "none") {
      spotifypopup.style.display = "block";
    } else {
      spotifypopup.style.display = "none";
    }
  }

}
