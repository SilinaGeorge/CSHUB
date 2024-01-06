

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import {  MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { Subscription, Observable } from 'rxjs';
import { GetNotesAction, DeleteNoteAction, updateNoteAction } from '../store/actions/notes.actions';
import { GetNotes, ReturnedNotes } from '../store/models/get-notes.model';
import { Note } from '../store/models/note.model';
import { Error } from '../store/models/error.model';

import * as moment from 'moment';
// import { NotesDocsDialogBoxComponent } from '../notes-docs-dialog-box/notes-docs-dialog-box.component';
import { take } from 'rxjs/operators';
import { GetSpaceLeftAction } from '../store/actions/user.actions';

@Component({
  selector: 'app-manage-notes',
  templateUrl: './manage-notes.component.html',
  styleUrls: ['./manage-notes.component.css']
})
export class ManageNotesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'topic', 'size' ,'dateCreated', 'dateModified' ,'action'];
  dataSource = new MatTableDataSource<Note>();
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  subscription: Subscription;
  subscription2: Subscription;
  userId : string;
  notes: ReturnedNotes
  error$: Observable<Error>;
  loading$: Observable<Boolean>;



  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {

    this.store.select(store => store.user).pipe(take(1)).subscribe(state =>   {
      if (state && state.user){
        this.userId = state.user._id
      }
    }); 

     this.subscription2 = this.store.select(store => store.noteState.deletedNote).subscribe(state =>{
      if (state){
        this.store.dispatch(new GetSpaceLeftAction({id:this.userId}));
      }
    }) 

    this.store.dispatch(new GetNotesAction({userId: this.userId}));
      this.error$ = this.store.select(store => store.noteState.getNotesError)

    this.subscription = this.store.select(store => store.noteState).subscribe(state =>   {
      if (state){

        this.notes = state.returnedNotes;
        if (this.notes){
           this.notes.notes.forEach(element => {
             if (moment(new Date(element.dateCreate)).format(("D/M/YYYY h:mm:ss a")) != 'Invalid date')
            element.dateCreate = moment(new Date(element.dateCreate)).format(("D/M/YYYY h:mm:ss a"))
          }); 

          
          this.dataSource = new MatTableDataSource(this.notes.notes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
         
        }
         

      }
      });
  
      

     
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  // openDialog(action,obj) {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(NotesDocsDialogBoxComponent, {
  //     width: '40%',
  //     data:obj
  //   });
 
  //   dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
  //      if(result.event == 'Update'){
  //       this.updateRowData(result.data);
  //     }else if(result.event == 'Delete'){
  //       this.deleteRowData(result.data);
  //     }
      
  //   });
  // }
 

  updateRowData(row_obj){
    let update = {userId: this.userId, _id: row_obj._id, name: row_obj.name, description:row_obj.description}
    this.store.dispatch(new updateNoteAction(update));
    this.error$ = this.store.select(store => store.noteState.updateNoteError)

    
  }
  deleteRowData(row_obj){

    this.store.dispatch(new DeleteNoteAction({userId: this.userId, _id: row_obj._id}));
    this.error$ = this.store.select(store => store.noteState.deleteNoteError)


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
