import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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

  saveNoteFormGroup: FormGroup;
  action:string;
  local_data:any;
 


  constructor(
    public dialogRef: MatDialogRef<ManageNotesDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private fb: FormBuilder, ) {
    
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ngOnInit() {

    this.saveNoteFormGroup = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
      ]],

    });

    this.name.setValue(this.local_data.name)
    this.description.setValue(this.local_data.description)

  }

  get name (){
    return this.saveNoteFormGroup.get('name')
  }

  get description (){
    return this.saveNoteFormGroup.get('description')
  }
 
  UpdateClick(){
    this.dialogRef.close({event:this.action,data:{_id:this.local_data._id, name:this.name.value, description: this.description.value}});
  }

  DeleteClick(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
