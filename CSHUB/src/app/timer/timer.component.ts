import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  hours: string = '1';
  minutes: string = '0';
  timeleft = 0;

  config = {
    leftTime: 3600, // intial timer is set to an hour
    demand: true,
  }

  constructor(private _snackbar: MatSnackBar) { }

  ngOnInit() {}

  timerFinished() {
    this._snackbar.open("Time to take a break!", 'Close');
  }


  change(): void {

    if (this.minutes == '') this.minutes = '0';
    if (this.hours == '') this.hours = '0';

    // time is a number
    if (!isNaN(parseInt(this.minutes)) && !isNaN(parseInt(this.hours))) {
      this.timeleft = parseInt(this.minutes) * 60 + parseInt(this.hours) * 3600
      if (this.timeleft != 0) {
        this.config = {
          leftTime: this.timeleft,
          demand: false,
        }
      }
    }

  }

}
