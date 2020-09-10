import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Can I Activate? - ' + state.url);
    if (!this.authService.isAuthenticated()) {
      // NOT AUTHED - PLEASE LOGIN
      console.log('BUSTED!');
      this.router.navigate([{outlets : {matcha: 'auth'}}]).then();
      return false;
    }
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]):
    Observable<boolean> | Promise<boolean> | boolean {
    console.log('Can I Load?');
    if (!this.authService.isAuthenticated()) {
      // NOT AUTHED - PLEASE LOGIN
      console.log('BUSTED!');
      this.router.navigate([{outlets : {matcha: 'auth'}}]).then();
      return false;
    }
    return true;
  }

}
