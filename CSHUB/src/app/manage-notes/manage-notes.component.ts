

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { ManageNotesDialogBoxComponent } from '../manage-notes-dialog-box/manage-notes-dialog-box.component';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { Subscription, Observable } from 'rxjs';
import { GetNotesAction, DeleteNoteAction } from '../store/actions/notes.actions';
import { GetNotes, ReturnedNotes } from '../store/models/get-notes.model';
import { Note } from '../store/models/note.model';
import { Error } from '../store/models/error.model';

import * as moment from 'moment';

@Component({
  selector: 'app-manage-notes',
  templateUrl: './manage-notes.component.html',
  styleUrls: ['./manage-notes.component.css']
})
export class ManageNotesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'topic', 'dateCreated', 'dateModified' ,'action'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<Note>();
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  subscription: Subscription;
  userId : string;
  notes: ReturnedNotes
  error$: Observable<Error>;
  loading$: Observable<Boolean>;



  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {



    this.subscription = this.store.select(store => store).subscribe(state =>   {
      if (state){

        this.userId = state.user.user._id;
        this.notes = state.noteState.returnedNotes;
        if (this.notes){
          this.dataSource = new MatTableDataSource(this.notes.notes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
         

      }
      });
  
      this.store.dispatch(new GetNotesAction({userId: this.userId}));
      this.error$ = this.store.select(store => store.noteState.getNotesError)

     
  }


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ManageNotesDialogBoxComponent, {
      width: '250px',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
       if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
 

  updateRowData(row_obj){
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      if(value._id == row_obj._id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){

    this.store.dispatch(new DeleteNoteAction({userId: this.userId, _id: row_obj._id}));
    this.error$ = this.store.select(store => store.noteState.deleteNoteError)


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
