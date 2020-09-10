import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ChatGuardService implements CanActivate {

  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userId = route.paramMap.get('id');
      if (!userId) {
        userId = route.parent.paramMap.get('id');
      }

      let matchId = route.paramMap.get('match_id');
      if (!matchId) {
        matchId = route.parent.paramMap.get('match_id');
      }

      if (matchId == null || userId == null || matchId === 'undefined') {
        console.log('CHAT GUARD BLOCKED THIS');
        return false;
      }
      console.log('CHAT GUARD ALLOWED THIS ' + matchId);
      return true;
  }

}
