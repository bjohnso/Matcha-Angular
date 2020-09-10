import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {ProfileService} from './profile.service';
import {catchError, map, take} from 'rxjs/operators';
import {JWTTokenService} from '../../services/jwt-token.service';
import {LikesService} from '../../services/likes.service';


@Injectable({providedIn: 'root'})
export class ProfileResolverService implements Resolve<any> {

  constructor(private likeService: LikesService, private profileService: ProfileService,
              private jwtService: JWTTokenService) {}

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
        location: this.profileService.getLocation().pipe(map(data => (data as any)), catchError(err => of(err))),
        interests: this.profileService.getInterests().pipe(map(data => (data as any).data.hobbies), catchError(err => of(err)))
      };
    } else {
      dictionary = {
        isLiked: new Promise((resolve) => {
          this.likeService.getLiked().pipe(take(1))
          .subscribe( e => {
            console.log(e.data);
            const results = e.data.find(like => (like as any).liked_user === userId &&
            (like as any).liking_user + '' === this.jwtService.getUserId());
            console.log(results);
            resolve(results != null && results !== undefined);
          });
        }),
        isVistor: Promise.resolve(true),
        profile: this.profileService.getUserById(userId).pipe(map(data => (data as any).data[0]), catchError(err => of(err))),
        interests: this.profileService.getInterests().pipe(map(data => (data as any).data.hobbies), catchError(err => of(err)))
      };
    }

    return forkJoin(dictionary);
  }
}
