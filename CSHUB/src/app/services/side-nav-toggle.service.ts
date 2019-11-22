import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavToggleService {
  private sidenav: MatSidenav;

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public open() {
		return this.sidenav.open();
	}


	public close() {
		return this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}
}



