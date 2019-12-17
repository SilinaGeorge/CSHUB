import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-icon',
  templateUrl: './timer-icon.component.html',
  styleUrls: ['./timer-icon.component.css']
})
export class TimerIconComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  //toggle timer show and not show
  openTimer(){
    // element timer is in timer component
    var timerdiv = document.getElementById("timer");
    if (timerdiv.style.display === "none") {
      timerdiv.style.display = "block";
    } else {
      timerdiv.style.display = "none";
    }
  }

}
