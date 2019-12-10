import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface UsersData {
  name: string;
  id: number;
}


@Component({
  selector: 'app-manage-notes-dialog-box',
  templateUrl: './manage-notes-dialog-box.component.html',
  styleUrls: ['./manage-notes-dialog-box.component.css']
})
export class ManageNotesDialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ManageNotesDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ngOnInit() {
  }

  action:string;
  local_data:any;
 

 
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
