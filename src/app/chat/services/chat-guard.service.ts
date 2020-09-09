import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ChatGuardService implements CanActivate {

  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userId = route.paramMap.get('id') as unknown as number;
      if (!userId) {
        userId = route.parent.paramMap.get('id') as unknown as number;
      }

      let matchId = route.paramMap.get('match_id') as unknown as number;
      if (!matchId) {
        matchId = route.parent.paramMap.get('match_id') as unknown as number;
      }

      return !!matchId && !!userId;
  }

}
