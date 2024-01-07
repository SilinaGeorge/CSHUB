import { Component, OnInit, Optional, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
  } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

export interface UsersData {
  name: string;
  id: number;
}


@Component({
  selector: 'app-notes-docs-dialog-box',
  templateUrl: './notes-docs-dialog-box.component.html',
  styleUrls: ['./notes-docs-dialog-box.component.scss'],
  standalone:true,
  imports:[ReactiveFormsModule, MatCommonModule, MatFormFieldModule, CommonModule, MatInputModule, MatDialogModule]
})
export class NotesDocsDialogBoxComponent implements OnInit {

  saveNoteFormGroup: FormGroup;
  action:string;
  local_data:any;


  constructor(
    public dialogRef: MatDialogRef<NotesDocsDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA)
    public data: UsersData,
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
