import { Component, HostListener } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss'],
})
export class AppComponent {

  closeResult: string;
  collapsed = true;
  Title: string = "CS HUB";

  constructor() {}

   private _opened: boolean = false;
 

  private _toggleOpened(): void {
    this._opened = !this._opened;
  } 


}
