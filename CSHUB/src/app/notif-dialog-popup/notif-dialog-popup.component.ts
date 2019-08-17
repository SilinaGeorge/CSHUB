import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material'
import * as moment from 'moment';


@Component({
  selector: 'app-notif-dialog-popup',
  templateUrl: './notif-dialog-popup.component.html',
  styleUrls: ['./notif-dialog-popup.component.css']
})
export class NotifDialogPopupComponent implements OnInit {

  displayedColumns = ['Select', 'Date'];
  data = Object.assign( ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);



  notifFormGroup: FormGroup;

  minDate = new Date();
  //dateTime = new Date();

  errorHTML ="";

  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar){}

  ngOnInit() {

    this.notifFormGroup = this.fb.group({
      ampm: ['', [
        Validators.required,
      ]],
      minute: ['', [
        Validators.required,
      ]],
      hour: ['', [
        Validators.required,
      ]],
      dateTime: [{value: new Date(), disabled: true}, [
        Validators.required,
      ]],

    });

  }

  get minute() {
    return this.notifFormGroup.get('minute').value;
  }

  get hour() {
    return this.notifFormGroup.get('hour').value;
  }

  get ampm() {
    return this.notifFormGroup.get('ampm').value;
  }

  get dateTime() {
    return this.notifFormGroup.get('dateTime').value;
  }

  //  send new email click ok
  okClick() {

    try{
    this.dateTime.setSeconds(0);
    this.dateTime.setMinutes(parseInt(this.minute));
    this.dateTime.setHours(parseInt(this.hour));

     if (this.ampm == "PM"){
      this.dateTime.setHours(parseInt(this.hour) + 12);
    } 
     else {
      this.dateTime.setHours(parseInt(this.hour));
    }  
    
  }
  catch(ex){
    this.errorHTML = `An error as occured.`;

  }

  console.log(this.dateTime)
  // api call node-schedule

  
  //snack bar show
  this._snackbar.open("Email Reminder Created:" + moment(this.dateTime).format(("dddd, MMMM Do YYYY, h:mm:ss a")),
  'Undo',
  { duration: 5000 });


  moment(this.dateTime).format('MM/DD/YYYY hh:mm');


  }


   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index,1)
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}


export interface Element {
  Date: Date;

}



const ELEMENT_DATA: Element[] = [
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
  {Date: new Date()},
];