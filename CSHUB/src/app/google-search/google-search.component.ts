import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-search',
  templateUrl: './google-search.component.html',
  styleUrls: ['./google-search.component.css']
})
export class GoogleSearchComponent implements OnInit {
  query: string;
  google = 'https://www.google.com/search?q='
  url: string;
  constructor() { }

  ngOnInit() {
  }
  
  searchClick() {
    this.url = this.google + this.query;
  }
}
