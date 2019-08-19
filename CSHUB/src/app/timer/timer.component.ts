import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  date  = moment(new Date()).add(1,'minute').unix();

 //console.log (moment(new Date()).add(1,'days').unix)));

  constructor() { }
  

  ngOnInit() {
  }

  timerEnd(){
    console.log("fdsfd")
  }

}
