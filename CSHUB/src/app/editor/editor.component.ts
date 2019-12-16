import { Component, OnInit, ViewChild,SecurityContext } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SideNavToggleService } from '../services/side-nav-toggle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { GetNotes, ReturnedNotes } from '../store/models/get-notes.model';
import { GetNotesAction, AddNoteAction, DeleteNoteAction, updateNoteAction } from '../store/actions/notes.actions';
import { Error } from '../store/models/error.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Topics} from '../topics'
import { SelectedNote, UpdateNote, Note, DeleteNote } from '../store/models/note.model';
import { MatDrawer } from '@angular/material';
import { AddNote } from '../store/models/add-note.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  userID: string
  topic:string;
  public content: string
  public editorConfig
  saveNoteFormGroup: FormGroup;
  addedNoteSub: Subscription;
  deletedNoteSub: Subscription;
  updatedNoteSub: Subscription;
  returnedNotesSub: Subscription;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  selectedNote: Note;
  isCreateNewNote: boolean = true;
  getTopicNotes: GetNotes = {userId: null, topic: null}
  topicNotes: ReturnedNotes;
  //selectedNoteId: String = "-1";
  initialSelectedNoteId: String = "";
  selectedIndex: number = -1;
  addNewNote: AddNote ={userId: null,description: null,name: null,content: null, topic:null};
  deleteNote: DeleteNote = {userId: null, _id:null}

  
  @ViewChild('sidenav', {static: true}) public sidenav: MatDrawer;

  constructor(private fb: FormBuilder, 
    private sideNavService: SideNavToggleService, 
    private store: Store<AppState>, 
    private actroute: ActivatedRoute,
    private router: Router,
    private sanitizer:DomSanitizer) { 

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    }

  ngOnDestroy(){

    let hamburgerIcon = document.getElementById("hamburgerIcon");
    hamburgerIcon.style.display = "none";
  
    this.addedNoteSub.unsubscribe()
    this.deletedNoteSub.unsubscribe()
    this.updatedNoteSub.unsubscribe()
    this.returnedNotesSub.unsubscribe()


  }

  ngOnInit() {

    this.sideNavService.setSidenav(this.sidenav);

    this.actroute.queryParams.pipe(take(1)).subscribe(params => {
     this.topic = params.topic;
    
     if (params.noteId) {

       this.initialSelectedNoteId = params.noteId
       //this.selectedNoteId = this.initialSelectedNoteId

     }
     
     if (this.topic == undefined || !Topics.includes(this.topic)) this.router.navigate(['/'])
     else this.getTopicNotes.topic = this.topic
 });
   
   this.store.select(store => store.user).pipe(take(1)).subscribe(state =>   {
     if (state && state.user){
       this.userID = state.user._id
        this.getTopicNotes.userId = this.userID;
       
     }
     }); 


  this.loading$ = this.store.select(store => store.noteState.loading)
   this.store.dispatch(new GetNotesAction(this.getTopicNotes))
   this.error$ = this.store.select(store => store.noteState.getNotesError)

   

   this.deletedNoteSub = this.store.select(store => store.noteState.deletedNote).subscribe(result =>
    {
      if (result){
        this.selectedIndex = this.selectedIndex - 1;
        if (this.selectedIndex != -1){
          this.selectedNote = this.topicNotes.notes[this.selectedIndex];
          this.content = this.selectedNote.content

        }
        else{
          this.selectedNote =null;
          this.content =""

        }
      }
      
    })


   this.addedNoteSub = this.store.select(store => store.noteState.addedNote).subscribe(result =>
    {
      if (result){
        this.selectedNote = result;
        this.selectedIndex =0;
      }
      
    })

    this.updatedNoteSub = this.store.select(store => store.noteState.updatedNote).subscribe(result =>
      {
        if (result){
          this.selectedNote = result;
        }
      })

   this.returnedNotesSub = this.store.select(store => store.noteState.returnedNotes).subscribe(notes =>{
     if (notes){

      this.topicNotes = notes
  
      if (this.initialSelectedNoteId && this.topicNotes){

       for(let i=0; i< this.topicNotes.notes.length; i++) {
          if (this.topicNotes.notes[i]._id == this.initialSelectedNoteId) {
            this.selectedNote = this.topicNotes.notes[i];
            this.content = this.selectedNote.content//this.decodeHtml(this.topicNotes.notes[i].content);
            this.selectedIndex = i;
            this.initialSelectedNoteId = null;
            break;
          }

        };
        if (this.selectedNote == null){
         //this.selectedNoteId = "-1"
         this.initialSelectedNoteId = null;
         this.selectedIndex = -1;

        }
      }
      else{
        this.initialSelectedNoteId = null;
        this.selectedIndex = -1;
        this.content =""

      }
     }
   })


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
      maximumImageFileSize: 5000000, // 5mb
      callbacks:{ onImageUploadError: function(msg){ console.log(msg); } },
      toolbar: [
          // [groupName, [list of button]]
          ['misc', ['undo', 'redo', 'help']],
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
    saveNotepopup.style.display = "block";
  }

   close(){
    let popup = document.getElementById("saveNote");
    popup.style.display = "none"; 
   
 }

 decodeHtml(str) {
  var txt = document.createElement("div");
  txt.innerHTML = str;
  let decoded = txt.innerText
  txt.remove()
  return decoded;
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
   this.selectedNote = note;
  this.content = note.content//this.decodeHtml(note.content)
  //this.selectedNoteId = note._id
  //this.initialSelectedNoteId = null; 
  this.selectedIndex = i;


}
onNewNoteClick(){
   this.selectedNote = null;
  this.content = "";
  //this.selectedNoteId = '-1';
  //this.initialSelectedNoteId = null;
  this.selectedIndex = -1;

}

onModalSave(){
  if (this.selectedNote){
     let updateNote: UpdateNote ={
      _id:this.selectedNote._id,
      userId: this.userID,
      description: this.description.value,
      name: this.name.value,
      content: this.content// this.sanitizer.sanitize(SecurityContext.HTML ,this.content)
    }
    this.store.dispatch(new updateNoteAction(updateNote));
    this.error$ = this.store.select(store => store.noteState.updateNoteError)
    

  }
  else{

    
    this.addNewNote ={
      userId: this.userID,
      description: this.description.value,
      name: this.name.value,
      content: this.content,//this.sanitizer.sanitize(SecurityContext.HTML ,this.content),
      topic: this.topic
    }

      this.store.dispatch(new AddNoteAction(this.addNewNote));
      this.error$ = this.store.select(store => store.noteState.addNoteError)
      //this.selectedIndex = 0
  }
  this.close()
    
  }

  onDeleteClick(){
    if(confirm("Delete "+ this.selectedNote.name + "?")) {
    this.deleteNote ={userId:this.userID, _id: this.selectedNote._id}
    
    this.store.dispatch(new DeleteNoteAction(this.deleteNote));
    this.error$ = this.store.select(store => store.noteState.deleteNoteError)
 
      

    
    }

}


}





