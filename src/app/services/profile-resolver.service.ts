import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {JWTTokenService} from './jwt-token.service';
import {Observable} from 'rxjs';
import {ProfileService} from '../profile/services/profile.service';

@Injectable({providedIn: 'root'})
export class ProfileResolverService implements Resolve<any> {

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.profileService.getProfile();
  }
}
