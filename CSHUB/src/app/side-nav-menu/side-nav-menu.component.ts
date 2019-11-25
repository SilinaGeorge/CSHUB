import { Component, OnInit } from '@angular/core';
import { ReturnedTopicNotes, GetTopicNotes } from '../store/models/get-notes.model';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import * as moment from 'moment';
import { SelectNoteAction } from '../store/actions/notes.actions';
import { SelectedNote } from '../store/models/note.model';


@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.css']
})
export class SideNavMenuComponent implements OnInit {
  topicNotes$: Observable<ReturnedTopicNotes>;
  topic$: Observable<GetTopicNotes>;
  selectedNoteId: number = -1;
  selectedNote: SelectedNote = {note:null, newNote:null};

  
  constructor(private store: Store<AppState> ) { }


  ngOnInit() {

    this.topicNotes$ = this.store.select(store => store.noteState.returnedTopicNotes)
    this.topic$ = this.store.select(store => store.noteState.getTopicNotes)

  }

  onNoteClick(note){
    console.log(note)
    this.selectedNote.note = note;
    this.selectedNote.newNote = false;
    this.store.dispatch(new SelectNoteAction(this.selectedNote));

  }
  onNewNoteClick(){
    console.log('new note click')
    this.selectedNote.note = null;
    this.selectedNote.newNote = true;
    this.store.dispatch(new SelectNoteAction(this.selectedNote));
  }
 
  select(index: number) {
    this.selectedNoteId = index;
}

}
