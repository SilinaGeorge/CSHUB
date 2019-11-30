import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SideNavToggleService } from '../services/side-nav-toggle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { GetTopicNotes, ReturnedTopicNotes } from '../store/models/get-notes.model';
import { GetTopicNotesAction, SelectNoteAction, AddNoteAction } from '../store/actions/notes.actions';
import { Error } from '../store/models/error.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Topics} from '../topics'
import { SelectedNote, SaveNote, Note } from '../store/models/note.model';
import { MatDrawer } from '@angular/material';
import { AddNote } from '../store/models/add-note.model';



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
  selectedNote: Note;
  isCreateNewNote: boolean = true;
  getTopicNotes: GetTopicNotes = {userId: null, topic: null}
  topicNotes: ReturnedTopicNotes;
  selectedNoteId: String = "-1";
  initialSelectedNoteId: String = "";
  selectedIndex: number = -1;
  addNewNote: AddNote ={userId: null,description: null,name: null,content: null, topic:null};

  
  @ViewChild('sidenav', {static: true}) public sidenav: MatDrawer;

  constructor(private fb: FormBuilder, 
    private sideNavService: SideNavToggleService, 
    private store: Store<AppState>, 
    private actroute: ActivatedRoute,
    private router: Router) { 

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnDestroy(){

    let hamburgerIcon = document.getElementById("hamburgerIcon");
    hamburgerIcon.style.display = "none";
  //  this.sidenav.close();

  }
  ngAfterViewInit(){
   // this.sidenav.open();


  }
  ngOnInit() {
    this.sideNavService.setSidenav(this.sidenav);

     this.actroute.queryParams.subscribe(params => {
      this.topic = params.topic;
     
      if (params.noteId) {
        console.log('heerrrreee')
        this.initialSelectedNoteId = params.noteId
        this.selectedNoteId = this.initialSelectedNoteId

      }
      
      if (this.topic == undefined || !Topics.includes(this.topic)) this.router.navigate(['/login-home'])
      else this.getTopicNotes.topic = this.topic
  });
    
    this.subscription = this.store.select(store => store).subscribe(state =>   {
      if (state){
        this.userID = state.user.user._id
         this.getTopicNotes.userId = this.userID;
         this.topicNotes = state.noteState.returnedTopicNotes

  
         if (this.initialSelectedNoteId && this.topicNotes){
          
          
          for(let i=0; i< this.topicNotes.notes.length; i++) {
             if (this.topicNotes.notes[i]._id == this.initialSelectedNoteId) {
               this.selectedNote = this.topicNotes.notes[i];
               this.content = this.topicNotes.notes[i].content;
               this.selectedIndex = i;
               this.initialSelectedNoteId = null;
               break;
             }

           };
           if (this.selectedNote == null){
            this.selectedNoteId = "-1"
            this.initialSelectedNoteId = null;
            this.selectedIndex = -1;

           }
         }
         /*
        if (state.noteState.selectedNote != null ){
          this.isCreateNewNote= state.noteState.selectedNote.newNote
          if (!state.noteState.selectedNote.newNote){
          this.selectedNote = state.noteState.selectedNote
          this.content = this.selectedNote.content
          
          }
          else{
            this.content = ''
            this.selectedNote = null;
          }

        } */ 
      }
      }); 

    this.store.dispatch(new GetTopicNotesAction(this.getTopicNotes));
    //this.topicNotes$ = this.store.select(store => store.noteState.returnedTopicNotes)
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
      height: '60vh',
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
    if (this.selectedNote)
    console.log(this.selectedNote._id)
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
  if (this.selectedNote){
    this.name.setValue(this.selectedNote.name);
    this.description.setValue(this.selectedNote.description);    
  }
  else{
    this.name.setValue("");
    this.description.setValue("")

  }

}

onNoteClick(note, i){
  console.log(note)
  this.selectedNote = note;
  this.content = note.content;
  this.selectedNoteId = note._id
  this.initialSelectedNoteId = null;
  this.selectedIndex = i;


}
onNewNoteClick(){
  console.log('new note click')
  this.selectedNote = null;
  this.content = "";
  this.selectedNoteId = '-1';
  this.initialSelectedNoteId = null;
  this.selectedIndex = -1;

}

/* select(index: number) {
  this.selectedNoteId = index;
  this.initialSelectedNoteId = null;
} */
initialNote(note){
  console.log('intial note hererere')
  this.selectedNote = note;
  this.content = note.content;
  this.initialSelectedNoteId = "";
  //this.selectedNoteId = note._id
}
onModalSave(){
  if (this.selectedNote){
    

  }
  else{

    this.addNewNote ={
      userId: this.userID,
      description: this.description.value,
      name: this.name.value,
      content: this.content,
      topic: this.topic
    }
    console.log('adding new note:' + this.addNewNote.description)
      this.store.dispatch(new AddNoteAction(this.addNewNote));
      
      try{
        this.selectedIndex = 0
        this.selectedNote = this.topicNotes[this.selectedIndex]
      }
      catch(ex){
        console.log(ex)
        this.selectedIndex = -1
      }
      

 /*      this.store.select(store => store.noteState.addedNote).subscribe(n =>   {
        if (n){
          this.selectedIndex = 0
          this.selectedNote = n

        }
        });  */
  
  }
  this.close()
    

  }

  onDeleteClick(){

  }


}





