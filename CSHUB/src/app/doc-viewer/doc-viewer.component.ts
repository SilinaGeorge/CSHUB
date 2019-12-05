import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { AddDocAction } from '../store/actions/docs.actions';
import { Subscription, Observable } from 'rxjs';
import { AddDoc } from '../store/models/docs.model';
import { Error } from '../store/models/error.model';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {
  doc = 'https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf'
  fileToUpload: File = null;
  userId =null
  subscription: Subscription;
  error$: Observable<Error>;

  constructor(private store: Store<AppState> ) { }

  ngOnInit() {
    
    this.subscription = this.store.select(store => store.user.user).subscribe(state =>   {
      if (state){
        this.userId = state._id;
      }
    });
    
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    
}

 onUploadClick() {
  if (this.fileToUpload){
    let upload: AddDoc ={
      userId: this.userId,
      file:this.fileToUpload,
      description: 'test dsciption frontend',
      name: 'test name frontend',
      topic: 'Python'
    }
    this.store.dispatch(new AddDocAction(upload));
    this.error$ = this.store.select(store => store.docsState.addDocError)
  }
  
} 

}
