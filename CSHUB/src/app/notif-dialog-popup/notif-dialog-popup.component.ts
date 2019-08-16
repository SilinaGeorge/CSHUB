import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notif-dialog-popup',
  templateUrl: './notif-dialog-popup.component.html',
  styleUrls: ['./notif-dialog-popup.component.css']
})
export class NotifDialogPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  okClick(){
    console.log("here")
    // api call node-schedule
  }

}
