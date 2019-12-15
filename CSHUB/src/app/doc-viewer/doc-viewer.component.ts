import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { AddDocAction, GetDocsAction, DeleteDocAction, UpdateDocAction } from '../store/actions/docs.actions';
import { Subscription, Observable } from 'rxjs';
import { AddDoc, GetMetaDocs, ReturnedMetaDocs, Doc, DeleteDoc, UpdateDoc } from '../store/models/docs.model';
import { Error } from '../store/models/error.model';
import { MatDrawer } from '@angular/material';
import { SideNavToggleService } from '../services/side-nav-toggle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Topics } from '../topics';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { take } from 'rxjs/operators';

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
  returnedMetaDocsSub: Subscription;
  deletedDocSub: Subscription;
  addedDocSub: Subscription;
  updatedDocSub: Subscription;
  error$: Observable<Error>;
  loading$: Observable<Boolean>;
  getMetaDocs: GetMetaDocs = {userId: null, topic: null}
  topic: string
  initialSelectedDocId: String =null
  metaDocs: ReturnedMetaDocs
  selectedDoc: Doc
  selectedIndex = -1
  uploadDocFormGroup: FormGroup;
  updateDocFormGroup: FormGroup;
  

  @ViewChild('docsidenav', {static: true}) public sidenav: MatDrawer;

  constructor(private store: Store<AppState>,private sideNavService: SideNavToggleService,     
    private actroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder ) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit() {
    this.sideNavService.setSidenav(this.sidenav);

    this.actroute.queryParams.pipe(take(1)).subscribe(params => {
      this.topic = params.topic;
     
       if (params.docId) this.initialSelectedDocId = params.docId

      if (this.topic == undefined || !Topics.includes(this.topic)) this.router.navigate(['/login-home'])
      else this.getMetaDocs.topic = this.topic
  });

    this.store.select(store => store.user).pipe(take(1)).subscribe(state =>   {
      if (state && state.user){
         this.getMetaDocs.userId = state.user._id;       
      }
    }); 

      this.loading$ = this.store.select(store => store.docsState.loading)
    this.store.dispatch(new GetDocsAction(this.getMetaDocs));
    this.error$ = this.store.select(store => store.docsState.getMetaDocsError)


    this.deletedDocSub = this.store.select(store => store.docsState.deletedDoc).subscribe(result =>
      {
        if (result){
          this.selectedIndex = this.selectedIndex - 1;
          if (this.selectedIndex != -1){
            this.selectedDoc = this.metaDocs.docs[this.selectedIndex];
            this.url = this.baseURL + this.selectedDoc._id
          }
          else{
            
            this.initialSelectedDocId = null;
            this.selectedIndex = -1;
            this.openUploadDocModal()

          }

        }
        
      })
  
  
     this.addedDocSub = this.store.select(store => store.docsState.addedDoc).subscribe(result =>
      {
        if (result){
          this.selectedDoc = result;
          this.url = this.baseURL + this.selectedDoc._id
          this.selectedIndex =0;
        }
        
      })
  
      this.updatedDocSub = this.store.select(store => store.docsState.updatedDoc).subscribe(result =>
        {
          if (result){
            this.selectedDoc = result;
          }
        })

    this.returnedMetaDocsSub = this.store.select(store => store.docsState.returnedMetaDocs).subscribe(docs =>{
      if (docs){
        this.metaDocs = docs

  
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
           this.openUploadDocModal()
          }
        } 
         else {
          this.selectedIndex = -1
         this.selectedDoc = null
         this.url = 'https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf'
         this.openUploadDocModal()
        } 
      }
    })

    let hamburgerIcon = document.getElementById("hamburgerIcon");
    hamburgerIcon.style.display = "block";
    

    this.uploadDocFormGroup = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
      ]],
      file:  ['', [Validators.required]],
    },{ validator: fileExentionValidator }
    );

    this.updateDocFormGroup = this.fb.group({
      updatename: ['', [
        Validators.required
      ]],
      updatedescription: ['', [
      ]],

    });


    this.loading$ = this.store.select(store => store.docsState.loading)
  }
checkFile(){
  
  if (this.uploadDocFormGroup.hasError('invalidFileExtention')){
  this.file.setErrors([{ 'invalidFileExtention': true }]);
}
else
this.file.setErrors(null);

}
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0)

}

  

get name() {
  return this.uploadDocFormGroup.get('name');
}

get description() {
  return this.uploadDocFormGroup.get('description');
}

get file() {
  return this.uploadDocFormGroup.get('file');
}

get updatename() {
  return this.updateDocFormGroup.get('updatename');
}

get updatedescription() {
  return this.updateDocFormGroup.get('updatedescription');
}

 onUploadClick() {
  if (this.fileToUpload){
    let upload: AddDoc ={
      userId: this.getMetaDocs.userId,
      file: this.fileToUpload,
      description: this.description.value,
      name: this.name.value,
      topic: this.topic
    }

    this.store.dispatch(new AddDocAction(upload));
    this.error$ = this.store.select(store => store.docsState.addDocError)
    //this.selectedIndex = this.selectedIndex + 1;

    this.name.setValue("");
    this.description.setValue("")
    this.closeUploadDocModal();
  }
  
} 


ngOnDestroy(){

  let hamburgerIcon = document.getElementById("hamburgerIcon");
  hamburgerIcon.style.display = "none";

  this.returnedMetaDocsSub.unsubscribe();
  this.deletedDocSub.unsubscribe();
  this.addedDocSub.unsubscribe();
  this.updatedDocSub.unsubscribe();
}

onDocClick(doc, i){
  if (this.selectedIndex == -1){
    this.closeUploadDocModal();
  }
  this.selectedDoc = doc;
 this.url = this.baseURL + doc._id;
 this.selectedIndex = i;

 

}


openUploadDocModal(){

  let uploadDocModal = document.getElementById("uploadDocModal");
  uploadDocModal.style.display = "block";

  this.selectedDoc = null;
  this.selectedIndex = -1;
  this.url = 'https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf';



}

setUploadModalData(){
  if (this.selectedDoc){
    this.updatename.setValue(this.selectedDoc.name);
    this.updatedescription.setValue(this.selectedDoc.description);    
  }
  else{
    this.name.setValue("");
    this.description.setValue("")

  }

}

closeUploadDocModal(){
  let uploadDocModal = document.getElementById("uploadDocModal");
  uploadDocModal.style.display = "none"; 
 
}

onDeleteClick(){
  if(confirm("Delete "+ this.selectedDoc.name + "?")) {
     let deleteDoc: DeleteDoc = {userId:this.getMetaDocs.userId, _id: this.selectedDoc._id}
    
    this.store.dispatch(new DeleteDocAction(deleteDoc));
    this.error$ = this.store.select(store => store.docsState.deleteDocError)
  
    //this.selectedIndex = this.selectedIndex - 1
    }
}

openUpdateDocModal(){
  let updateDocModal = document.getElementById("updateDocModal");
  updateDocModal.style.display = "block";

  this.setUploadModalData();
}

closeUpdateDocModal(){
  let updateDocModal = document.getElementById("updateDocModal");
  updateDocModal.style.display = "none";
}

onUpdateClick(){
  let updateDoc: UpdateDoc ={
    _id:this.selectedDoc._id,
    userId: this.getMetaDocs.userId,
    description: this.updatedescription.value,
    name: this.updatename.value
  }
  this.store.dispatch(new UpdateDocAction(updateDoc));
  this.error$ = this.store.select(store => store.docsState.updateDocError)
  this.closeUpdateDocModal();
  


}



}

// check password and verify password are the same
export const fileExentionValidator: ValidatorFn = (passFormGroup: FormGroup): ValidationErrors | null => {
  let extention = passFormGroup.get('file').value.split('.').pop().toLowerCase();
  let allowedExtensionTypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|txt/

  const isValidExtension =  allowedExtensionTypes.test(extention);
 
 
  if (isValidExtension)
    return null;
  else

    return { invalidFileExtention: true };
};

