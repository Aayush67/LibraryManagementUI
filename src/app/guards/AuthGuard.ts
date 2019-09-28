import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router) {
  }

  checkLocalStorage() {
    if (localStorage.getItem('email')) {
      return true;
    } else {
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const localStorageData = this.checkLocalStorage();
    console.log('aaa',state);
    if(!localStorageData) {
      this.router.navigate(['/login']);
    } else if( state.url === '/'){
        this.router.navigate(['/homepage']);
    } else {
      return true;
    }
    // you can save redirect url so after authenticating we can move them back to the page they requested
    return false;
  }

}
