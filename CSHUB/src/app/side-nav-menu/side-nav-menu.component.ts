import { Component, OnInit } from '@angular/core';
import { ReturnedTopicNotes } from '../store/models/get-notes.model';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import * as moment from 'moment';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.css']
})
export class SideNavMenuComponent implements OnInit {
  topicNotes$: Observable<ReturnedTopicNotes>;
  selectedIndex: number = -1;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.topicNotes$ = this.store.select(store => store.noteState.returnedTopicNotes)

  }

  onNoteClick(note){
    console.log(note)

  }
  onNewNoteClick(){
    console.log('new note click')
  }
 
  select(index: number) {
    this.selectedIndex = index;
}

}
