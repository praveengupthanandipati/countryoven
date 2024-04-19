import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private location: Location,private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.isLoggedIn()
    if (!isAuthenticated) {
      this.openDialog();
   
    //  return false
    }
    return true
  }


  openDialog(): void {
    this.router.navigateByUrl('/login?arg=re');
  }


  isLoggedIn()
  {
    
    return localStorage.getItem('email') ? true : false
  }
}
