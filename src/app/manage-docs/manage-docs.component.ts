import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatTable, MatPaginator, MatSort } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import * as moment from 'moment';
import { Error } from '../store/models/error.model';
import { UpdateDocAction, DeleteDocAction, GetDocsAction } from '../store/actions/docs.actions';
import { ReturnedMetaDocs, Doc } from '../store/models/docs.model';
import { NotesDocsDialogBoxComponent } from '../notes-docs-dialog-box/notes-docs-dialog-box.component';
import { take } from 'rxjs/operators';
import { GetSpaceLeftAction } from '../store/actions/user.actions';

@Component({
  selector: 'app-manage-docs',
  templateUrl: './manage-docs.component.html',
  styleUrls: ['./manage-docs.component.css']
})
export class ManageDocsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'topic', 'filename', 'filesize', 'dateCreated', 'dateModified' ,'action'];
  dataSource = new MatTableDataSource<Doc>();
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  subscription: Subscription;
  subscription2: Subscription;
  userId : string;
  docs: ReturnedMetaDocs
  error$: Observable<Error>;
  loading$: Observable<Boolean>;

  constructor(public dialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select(store => store.user).pipe(take(1)).subscribe(state =>   {
      if (state && state.user){
        this.userId = state.user._id
      }
    }); 

    this.subscription2 = this.store.select(store => store.docsState.deletedDoc).subscribe(state =>{
      if (state)
      this.store.dispatch(new GetSpaceLeftAction({id:this.userId})); 
  })

    this.store.dispatch(new GetDocsAction({userId: this.userId}));
    this.error$ = this.store.select(store => store.docsState.getMetaDocsError)

    this.subscription = this.store.select(store => store.docsState).subscribe(state =>   {
      if (state){

        this.docs = state.returnedMetaDocs;
         if (this.docs){
           this.docs.docs.forEach(element => {
            if (moment(new Date(element.dateCreate)).format(("D/M/YYYY h:mm:ss a")) != 'Invalid date')
            element.dateCreate = moment(new Date(element.dateCreate)).format(("D/M/YYYY h:mm:ss a"))
          });  
          
          this.dataSource = new MatTableDataSource(this.docs.docs);
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

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(NotesDocsDialogBoxComponent, {
      width: '40%',
      data:obj
    });
 
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
       if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
 

  updateRowData(row_obj){
    let update = {userId: this.userId, _id: row_obj._id, name: row_obj.name, description:row_obj.description}
    this.store.dispatch(new UpdateDocAction(update));
    this.error$ = this.store.select(store => store.docsState.updateDocError)
    
  }
  deleteRowData(row_obj){
    this.store.dispatch(new DeleteDocAction({userId: this.userId, _id: row_obj._id}));
    this.error$ = this.store.select(store => store.docsState.deleteDocError)

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
