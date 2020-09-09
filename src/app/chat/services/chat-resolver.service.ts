import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ProfileService} from '../../profile/services/profile.service';



@Injectable({providedIn: 'root'})
export class ChatResolverService implements Resolve<any> {

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let userId = route.paramMap.get('id') as unknown as number;
    if (!userId) {
      userId = route.parent.paramMap.get('id') as unknown as number;
    }

    let matchId = route.paramMap.get('match_id') as unknown as number;
    if (!matchId) {
      matchId = route.parent.paramMap.get('match_id') as unknown as number;
    }

    const dictionary = {
        matchId: Promise.resolve(matchId),
        profile: this.profileService.getUserById(userId).pipe(map(data => (data as any).data[0]), catchError(err => of(err))),
    };

    return forkJoin(dictionary);
  }
}
