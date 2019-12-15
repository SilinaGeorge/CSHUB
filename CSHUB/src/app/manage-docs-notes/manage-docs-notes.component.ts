import { Component, OnInit } from '@angular/core';
import { SpaceLeft } from '../store/models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { Error } from '../store/models/error.model';
import { take } from 'rxjs/operators';
import { GetSpaceLeftAction } from '../store/actions/user.actions';


@Component({
  selector: 'app-manage-docs-notes',
  templateUrl: './manage-docs-notes.component.html',
  styleUrls: ['./manage-docs-notes.component.css']
})
export class ManageDocsNotesComponent implements OnInit {

  spaceleft$: Observable<SpaceLeft>;
  error$: Observable<Error>;
  userId: string

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select(store => store.user.user).pipe(take(1)).subscribe(state =>{
      if (state){
        this.userId = state._id;
      }
    })
    this.store.dispatch(new GetSpaceLeftAction({id:this.userId}));
    this.spaceleft$ = this.store.select(store => store.user.returnedSpaceLeft)
    this.error$ = this.store.select(store => store.user.getSpaceLeftError)

  }

}
