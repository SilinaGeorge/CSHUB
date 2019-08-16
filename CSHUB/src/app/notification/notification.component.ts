import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { NotifDialogPopupComponent } from '../notif-dialog-popup/notif-dialog-popup.component'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){
    this.dialog.open(NotifDialogPopupComponent,);
  }

  
}
