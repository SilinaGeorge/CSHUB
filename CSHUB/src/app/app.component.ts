import { Component, OnInit } from '@angular/core';
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

 

  constructor(private sideNavService: SideNavToggleService) { 
  }

  ngOnInit() { 

    

  } 

  clickSideBar() { 
    this.sideNavService.toggle();
  }

 



}
