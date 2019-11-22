import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SideNavToggleService } from './services/side-nav-toggle.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss'],
})
export class AppComponent implements OnInit  {

  closeResult: string;
  collapsed = true;
  Title: string = "CS HUB";


  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;
 

  constructor(private sideNavService: SideNavToggleService) { 
  }

  ngOnInit() { 

    this.sideNavService.setSidenav(this.sidenav);

  } 

   public _opened: boolean = false;
 



}
