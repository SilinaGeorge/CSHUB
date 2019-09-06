import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {
  doc = 'https://cdn.s3waas.gov.in/master/uploads/2016/09/document_1481208108.pdf'
  constructor() { }

  ngOnInit() {
  }

}
