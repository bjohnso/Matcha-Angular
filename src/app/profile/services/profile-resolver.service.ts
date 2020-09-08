import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {ProfileService} from './profile.service';
import {catchError, map, take} from 'rxjs/operators';
import {JWTTokenService} from '../../services/jwt-token.service';


@Injectable({providedIn: 'root'})
export class ProfileResolverService implements Resolve<any> {

  constructor(private profileService: ProfileService, private jwtService: JWTTokenService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let userId = route.paramMap.get('id') as unknown as number;
    if (!userId) {
      userId = route.parent.paramMap.get('id') as unknown as number;
    }

    let dictionary;
    if (this.jwtService.isCurrentUser(userId)) {
      dictionary = {
        isVistor: Promise.resolve(false),
        profile: this.profileService.getProfile().pipe(map(data => (data as any).data), catchError(err => of(err))),
        interests: this.profileService.getInterests().pipe(map(data => (data as any).data.hobbies), catchError(err => of(err)))
      };
    } else {
      dictionary = {
        isVistor: Promise.resolve(true),
        profile: this.profileService.getUserById(userId).pipe(map(data => (data as any).data[0]), catchError(err => of(err))),
        interests: this.profileService.getInterests().pipe(map(data => (data as any).data.hobbies), catchError(err => of(err)))
      };
    }

    return forkJoin(dictionary);
  }
}
