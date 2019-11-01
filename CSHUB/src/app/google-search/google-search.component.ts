import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-google-search',
  templateUrl: './google-search.component.html',
  styleUrls: ['./google-search.component.css']
})
export class GoogleSearchComponent implements OnInit {
  query: string;
  google = 'https://www.google.com/search?q='
  url: SafeUrl;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  
  searchClick() {
    //this.url = this.google + this.query;

    let sanatizedUrl= this.sanitizer.sanitize(SecurityContext.URL, this.google + this.query);
    this.url = this.sanitizer.bypassSecurityTrustUrl(sanatizedUrl);
  }
}
