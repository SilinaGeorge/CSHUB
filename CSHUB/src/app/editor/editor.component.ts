import { Component, OnInit } from '@angular/core';
import CKFinder from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';

import * as InlineEditor from '@ckeditor/ckeditor5-build-inline'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  public Editor = InlineEditor;
  text = 'this is a test'
  editorConfig = {
    placeholder: 'Type the content here!',
  };

  constructor() { }

  ngOnInit() {
  }


}



