import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SideNavToggleService } from '../services/side-nav-toggle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {


  public content='helli'
  public editorConfig
  saveNoteFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private sidenav: SideNavToggleService) { }

  ngOnDestroy(){

    let hamburgerIcon = document.getElementById("hamburgerIcon");
    hamburgerIcon.style.display = "none";
    this.sidenav.close();

  }

  ngOnInit() {
    this.sidenav.open();

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
          ['insert', ['table', 'picture', 'link', 'video', 'hr']]
      ],
      fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
    }
    

  };

  openModal(){
    var spotifypopup = document.getElementById("saveNote");
   if (spotifypopup.style.display === "none") {
     spotifypopup.style.display = "block";
   } else {
     spotifypopup.style.display = "none";
   } 
  }

   close(){
    let popup = document.getElementById("saveNote");
    popup.style.display = "none"; 
   
 }
 onSave(){
  
   console.log(this.content)
 }
 


}





