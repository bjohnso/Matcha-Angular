import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {ProfileService} from '../profile/services/profile.service';
import {catchError} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ProfileResolverService implements Resolve<any> {

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const dictionary = {
      profile: this.profileService.getProfile().pipe(catchError(err => of(err))),
      interests: this.profileService.getInterests().pipe(catchError(err => of(err)))
    };

    return forkJoin(dictionary);
  }
}
