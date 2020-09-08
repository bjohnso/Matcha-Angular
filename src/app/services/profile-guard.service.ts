import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProfileGuardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.paramMap.get('id')) {
      return true;
    }

    if (route.parent.paramMap.get('id')) {
      return true;
    }
    return false;
  }
}
