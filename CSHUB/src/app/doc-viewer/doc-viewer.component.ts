import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { AddDocAction, GetDocsAction } from '../store/actions/docs.actions';
import { Subscription, Observable } from 'rxjs';
import { AddDoc, GetMetaDocs, ReturnedMetaDocs, Doc } from '../store/models/docs.model';
import { Error } from '../store/models/error.model';
import { MatDrawer } from '@angular/material';
import { SideNavToggleService } from '../services/side-nav-toggle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Topics } from '../topics';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {
  baseURL= 'https://localhost:4200/docs/'
  url = 'https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf'
  fileToUpload: File = null;
  userId =null
  subscription: Subscription;
  error$: Observable<Error>;
  loading$: Observable<Boolean>;
  getMetaDocs: GetMetaDocs = {userId: null, topic: null}
  topic: string
  initialSelectedDocId: String =""
  metaDocs: ReturnedMetaDocs
  selectedDoc: Doc
  selectedIndex = -1

  @ViewChild('docsidenav', {static: true}) public sidenav: MatDrawer;

  constructor(private store: Store<AppState>,private sideNavService: SideNavToggleService,     
    private actroute: ActivatedRoute,
    private router: Router ) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit() {

    this.loading$ = this.store.select(store => store.docsState.loading)

    this.actroute.queryParams.subscribe(params => {
      this.topic = params.topic;
     
       if (params.docId) this.initialSelectedDocId = params.docId

      if (this.topic == undefined || !Topics.includes(this.topic)) this.router.navigate(['/login-home'])
      else this.getMetaDocs.topic = this.topic
  });

  this.sideNavService.setSidenav(this.sidenav);
    let hamburgerIcon = document.getElementById("hamburgerIcon");
    hamburgerIcon.style.display = "block";
    
    this.subscription = this.store.select(store => store).subscribe(state =>   {
      if (state){
         this.getMetaDocs.userId = state.user.user._id;
         this.metaDocs = state.docsState.returnedMetaDocs

  
         if (this.initialSelectedDocId && this.metaDocs){
          
          
          for(let i=0; i< this.metaDocs.docs.length; i++) {
             if (this.metaDocs.docs[i]._id == this.initialSelectedDocId) {
               this.selectedDoc = this.metaDocs.docs[i];
               this.url = this.baseURL + this.metaDocs.docs[i]._id;
               this.selectedIndex = i;
               this.initialSelectedDocId = null;
               break;
             }

           };
           if (this.selectedDoc == null){
            this.initialSelectedDocId = null;
            this.selectedIndex = -1;

           }
         }
          else if (this.selectedIndex != -1){

          try{
          this.selectedDoc = this.metaDocs.docs[this.selectedIndex]
          this.url = this.baseURL + this.selectedDoc._id;
          }catch(err){
            console.log(err)
          }

         }  
          else{

          this.selectedDoc = null
          this.url = 'https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf'

         } 
         
      }
      }); 
    
    this.store.dispatch(new GetDocsAction(this.getMetaDocs));
    //this.topicNotes$ = this.store.select(store => store.noteState.returnedTopicNotes)
    this.error$ = this.store.select(store => store.docsState.getMetaDocsError)
    
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    
}

 onUploadClick() {
  if (this.fileToUpload){
    let upload: AddDoc ={
      userId: this.getMetaDocs.userId,
      file:this.fileToUpload,
      description: 'test dsciption frontend2',
      name: 'test name frontend2',
      topic: 'Python'
    }
    this.store.dispatch(new AddDocAction(upload));
    this.error$ = this.store.select(store => store.docsState.addDocError)
  }
  
} 


ngOnDestroy(){

  let hamburgerIcon = document.getElementById("hamburgerIcon");
  hamburgerIcon.style.display = "none";
}

onDocClick(doc, i){
  this.selectedDoc = doc;
 this.url = this.baseURL + doc._id;
 this.selectedIndex = i;


}
onNewDocClick(){
   this.selectedDoc = null;
 this.url = 'https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf';

 this.selectedIndex = -1; 

}

openUploadDocModal(){


  let uploadDocModal = document.getElementById("uploadDocModal");
 if (uploadDocModal.style.display === "none") {
  uploadDocModal.style.display = "block";
 } else {
  uploadDocModal.style.display = "none";
 } 
}

closeUploadDocModal(){
  let uploadDocModal = document.getElementById("uploadDocModal");
  uploadDocModal.style.display = "none"; 
 
}

}
