import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SideNavToggleService } from '../services/side-nav-toggle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { GetTopicNotes } from '../store/models/get-notes.model';
import { GetTopicNotesAction } from '../store/actions/notes.actions';
import { Error } from '../store/models/error.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Topics} from '../topics'
import { SelectedNote, SaveNote } from '../store/models/note.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  userID: String
  topic:string;
  public content: String
  public editorConfig
  saveNoteFormGroup: FormGroup;
  subscription: Subscription;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  selectedNote: SelectedNote;
  isCreateNewNote: boolean = true;
  getTopicNotes: GetTopicNotes = {userId: null, topic: "Python"}

  constructor(private fb: FormBuilder, 
    private sidenav: SideNavToggleService, 
    private store: Store<AppState>, 
    private actroute: ActivatedRoute,
    private router: Router) { 

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnDestroy(){

    let hamburgerIcon = document.getElementById("hamburgerIcon");
    hamburgerIcon.style.display = "none";
    this.sidenav.close();

  }
  ngAfterViewInit(){
    this.sidenav.open();


  }
  ngOnInit() {

     this.actroute.queryParams.subscribe(params => {
      this.topic = params.topic;
      if (this.topic == undefined || !Topics.includes(this.topic)) this.router.navigate(['/login-home'])
      else this.getTopicNotes.topic = this.topic
  });

         
    this.subscription = this.store.select(store => store).subscribe(state =>   {
      if (state){
        this.userID = state.user.user._id
        this.getTopicNotes.userId = this.userID;
        if (state.noteState.selectedNote != null ){
          this.isCreateNewNote= state.noteState.selectedNote.newNote
          if (!state.noteState.selectedNote.newNote){
          this.selectedNote = state.noteState.selectedNote
          this.content = this.selectedNote.note.content
          
          }
          else{
            this.content = ''
            this.selectedNote = null;
          }

        } 
      }
      }); 

    this.store.dispatch(new GetTopicNotesAction(this.getTopicNotes));
    this.error$ = this.store.select(store => store.noteState.getTopicNotesError)
    

    let hamburgerIcon = document.getElementById("hamburgerIcon");
    hamburgerIcon.style.display = "block";

    this.saveNoteFormGroup = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
      ]],

    });

    this.editorConfig = {
      disableResizeEditor: true,
      height: '70vh',
      placeholder: '',
      tabsize: 2,
      uploadImagePath: '',
      maximumImageFileSize: 200*1024, // 200 KB 
      callbacks:{ onImageUploadError: function(msg){ console.log(msg); } },
      toolbar: [
          // [groupName, [list of button]]
          ['misc', [, 'undo', 'redo', 'codeBlock', 'help']],
          ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
          ['fontsize', ['fontname', 'fontsize', 'color']],
          ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
          ['insert', ['table', 'picture', 'link', 'video', 'hr']],
          ['view', ['fullscreen', 'codeview']],
      ],
      fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
    }
    

  };



  openModal(){
    var saveNotepopup = document.getElementById("saveNote");
   if (saveNotepopup.style.display === "none") {
    saveNotepopup.style.display = "block";
   } else {
    saveNotepopup.style.display = "none";
   } 
  }

   close(){
    let popup = document.getElementById("saveNote");
    popup.style.display = "none"; 
   
 }
 onCreateNewSave(){
  
  console.log(this.content, this.name, this.description)
  this.name.value;
 }

 onSaveNoteClick(){
  console.log(this.content, this.name, this.description)
/*   let noteToSave: SaveNote ={
    userId: this.userID,
    content: this.content,
    
  } */
 }

 get name() {
  return this.saveNoteFormGroup.get('name');
}

get description() {
  return this.saveNoteFormGroup.get('description');
}
 
setData(){
  if (this.selectedNote && this.selectedNote.note){
    this.name.setValue(this.selectedNote.note.name);
    this.description.setValue(this.selectedNote.note.description);    
  }
  else{
    this.name.setValue("");
    this.description.setValue("")

  }

}


}





