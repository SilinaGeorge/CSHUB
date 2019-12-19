import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';
import { LogoutUserAction } from '../store/actions/user.actions';
import { SideNavToggleService } from '../services/side-nav-toggle.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  
  user$: Observable<User>;
  collapsed:any;

  constructor(private store: Store<AppState>, private sideNavService: SideNavToggleService) { }

  ngOnInit() {
    this.user$ = this.store.select(store => store.user.user)
  }

  logout(){
    if(confirm("Are you sure you want to log out?")) {
    this.store.dispatch(new LogoutUserAction());
    }

  }

  clickSideBar() { 
    this.sideNavService.toggle();
  }
}
