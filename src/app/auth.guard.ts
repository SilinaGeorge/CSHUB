import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service'

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private router: Router,  private auth: AuthService ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      // check backend to see if user is logged in
     return this.auth.checkLoggedin().toPromise()
      .then(response => {
        if (!response.isloggedin){
          this.router.navigateByUrl('/') 
          return false
        }
        return true
      })
      .catch(() => this.router.navigateByUrl('/'));
  }
  
}
