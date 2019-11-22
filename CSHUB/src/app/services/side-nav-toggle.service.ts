import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavToggleService {
  private sidenav: MatDrawer;

	public setSidenav(sidenav: MatDrawer) {
		this.sidenav = sidenav;
	}

	public open() {
		return this.sidenav.opened = true;
	}


	public close() {
		return this.sidenav.opened = false;
	}

/* 	public toggle(): void {
		this.sidenav.toggle();
	} */
}



