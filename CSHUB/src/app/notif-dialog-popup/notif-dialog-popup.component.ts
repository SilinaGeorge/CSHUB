import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms'
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
  data = Object.assign(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);



  notifFormGroup: FormGroup;

  minDate = new Date();
  //dateTime: Date;

  errorHTML = "";

  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar) { }

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
      dateTime: [{ value: new Date(), disabled: true }, [
        Validators.required,
      ]],

    }, { validator: timeValidator });

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

    try {
      this.dateTime.setSeconds(0);
      this.dateTime.setMinutes(parseInt(this.minute));
      this.dateTime.setHours(parseInt(this.hour));

      if (this.ampm == "PM") {
        this.dateTime.setHours(parseInt(this.hour) + 12);
      }
      else {
        this.dateTime.setHours(parseInt(this.hour));
      }

    }
    catch (ex) {
      this.errorHTML = `An error as occured.`;

    }



    console.log(this.dateTime)
    //check if datetime > now datetime
    // api call node-schedule


    //snack bar show
    this._snackbar.open("Email Reminder Created: " + moment(this.dateTime).format(("dddd, MMMM Do YYYY, h:mm a")),
      'OK',
      { duration: 6000 });




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
      this.data.splice(index, 1)
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


  // check to see if datetimetime has not past yet on every input
  onTimeInput() {
    if (this.notifFormGroup.hasError('timeNotValid'))
    this.notifFormGroup.setErrors([{ 'timeNotValid': true }]);
    else
      this.notifFormGroup.setErrors(null);
  }

}


export interface Element {
  Date: Date;

}



const ELEMENT_DATA: Element[] = [
  { Date: new Date() },
  { Date: new Date() },
  { Date: new Date() },

];

// check to see if the datetime has not past yet
export const timeValidator: ValidatorFn = (timeFormGroup: FormGroup): ValidationErrors | null => {
  try{
    let dateTime = new Date(timeFormGroup.get('dateTime').value.getTime());
    let minute = timeFormGroup.get('minute').value;
    let hour = timeFormGroup.get('hour').value;
    let ampm = timeFormGroup.get('ampm').value;


    dateTime.setSeconds(0);
    dateTime.setMinutes(parseInt(minute));
    dateTime.setHours(parseInt(hour));

    if (ampm == "PM") {
      dateTime.setHours(parseInt(hour) + 12);
    }
    else {
      dateTime.setHours(parseInt(hour));
    }

    if (dateTime > new Date())
      return null;
    else
      return { timeNotValid: true };
    }
    catch(ex){
      return null;
    }

};