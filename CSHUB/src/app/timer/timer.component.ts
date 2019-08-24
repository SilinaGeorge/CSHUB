import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { Config } from 'ngx-countdown';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  date = moment(new Date()).add(1, 'minute').unix();
  hours: string = '1';
  minutes: string = '0';
  timeleft = 30;

  config = {
    leftTime: 3600,
    demand: true,
  }

  //console.log (moment(new Date()).add(1,'days').unix)));

  constructor(private _snackbar: MatSnackBar) { }


  ngOnInit() {
  }

  timerFinished() {
    this._snackbar.open("Time to take a break!", 'OK');
  }


  change(): void {

    if (this.minutes == '') this.minutes = '0';
    if (this.hours == '') this.hours = '0';

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
