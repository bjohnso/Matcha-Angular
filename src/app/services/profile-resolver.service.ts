import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {ProfileService} from '../profile/services/profile.service';
import {catchError} from 'rxjs/operators';
import {JWTTokenService} from './jwt-token.service';


@Injectable({providedIn: 'root'})
export class ProfileResolverService implements Resolve<any> {

  constructor(private profileService: ProfileService, private jwtService: JWTTokenService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const userId = route.params.id;
    let dictionary;
    if (this.jwtService.isCurrentUser(userId)) {
      dictionary = {
        isVistor: Promise.resolve(false),
        profile: this.profileService.getProfile().pipe(catchError(err => of(err))),
        interests: this.profileService.getInterests().pipe(catchError(err => of(err)))
      };
    } else {
      dictionary = {
        isVistor: Promise.resolve(true),
        profile: this.profileService.getUserById(userId).pipe(catchError(err => of(err))),
        interests: this.profileService.getInterests().pipe(catchError(err => of(err)))
      };
    }

    return forkJoin(dictionary);
  }
}
