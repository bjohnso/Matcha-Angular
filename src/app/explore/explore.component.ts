import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../profile/services/profile.service';
import {Profile} from '../profile/models/profile.model';
import { take } from 'rxjs/operators';
import { Match } from '../models/block.model';
import { LikesService } from '../services/likes.service';
import { MatchService } from '../services/match.service';
import {JWTTokenService} from '../services/jwt-token.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  sexual_preferences: string [] = ['male', 'female' , 'both'];
  interests: string [] = [];
  profiles: Profile [] = null;
  profilesShown: Profile [] = [];
  matches: Match [] = [];
  likes: [] = [];
  sortable: string[] = ['age', 'location', 'popularity'];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  formError = false;
  errorMessage = '';
  isCollapsed = false;
  hideFilter = 'Hide Filter';

  constructor(private profileService: ProfileService, private like: LikesService,
              private match: MatchService, private jwTokenService: JWTTokenService) {}

  ngOnInit(): void {
    this.like.getLiked().pipe(take(1)).subscribe( e => {this.likes = e.data; console.log(this.likes); });
    this.match.getMatches().pipe(take(1)).subscribe(e => this.matches = e.data
      .filter(match => match.id + '' !== this.jwTokenService.getUserId()));
    this.profileService.getInterests().pipe(take(1)).subscribe(data => {
      this.interests = (data as any).data.hobbies;
    });

    this.formError = false;
    this.errorMessage = '';
  }



  onSubmit(form: NgForm) {
    this.like.getLiked().pipe(take(1)).subscribe( e => {this.likes = e.data; });
    this.match.getMatches().pipe(take(1)).subscribe(e => this.matches = e.data);
    console.log(form.value);
    let sexual_preference;
    let age: { min: any; max: any; };
    let popularity: { min: any; max: any; };
    let radius: number;
    let interests = null;

    if (form.value.sexual_preference && form.value.sexual_preference !== '') {
      sexual_preference = form.value.sexual_preference;
    }

    if (form.value['age.min'] && form.value['age.max']) {
      age = {min : form.value['age.min'] , max : form.value['age.max']};
      if (age && 'min' in age && age.min > age.max || age.min < 0) {
        this.notificationError('The age values are not correct');
        return;
      }
    }

    if (form.value['popularity.min'] && form.value['popularity.max']) {
      popularity = {min : form.value['popularity.min'] , max : form.value['popularity.max']};
      if (popularity && 'min' in popularity && popularity.min > popularity.max || popularity.min < 0) {
        this.notificationError('The popularity values are not correct');
        return ;
      }
    }

    if (form.value.radius) {
      radius = form.value.radius;
      if (radius && radius < 0 || radius > 400075) {
        this.notificationError('The radius is below 0 or over what is possible');
        return ;
      }
    }

    if (form.value.interests && form.value.interests.length > 0) {
      interests = form.value.interests;
    }

    this.profileService.getUserByFilter(radius, popularity, sexual_preference, interests, age).pipe(take(1)).subscribe((e) => {
      let data = (e as any).data;
      if (form.value.sortable) {
         form.value.sortable.forEach(element => {
          data = data.sort((a, b ) => {
            if (element === 'age') {
              return (new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime());
            } else if (element === 'location') {
              return  ((a.location[0] - b.location[0]) || (a.location[1] - b.location[1]));
            } else if (element === 'popularity') {
              return a.popularity - b.popularity;
            }
           });
        });
      }

      this.profiles = data.filter(profile => profile.id + '' !== this.jwTokenService.getUserId());
      this.collectionSize = this.profiles.length;
      this.refreshProfiles();
    });
  }

  refreshProfiles() {
    this.like.getLiked().pipe(take(1)).subscribe( e => {this.likes = e.data; });
    this.match.getMatches().pipe(take(1)).subscribe(e => this.matches = e.data
      .filter(match => match.id + '' !== this.jwTokenService.getUserId()));
    this.profilesShown = this.profiles
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.profilesShown.forEach(data => {
      (data as any).like = (this.likes.filter(e => {
        return ((e as any).liked_user === data.id || (e as any).liking_user === data.id); }).length > 0);
      (data as any).match = (this.matches.filter(e => {
        return ((e as any).user1 === data.id || (e as any).user2 === data.id); }).length > 0);
    });
    this.formError = false;
    this.errorMessage = '';
  }

  onLikeEvent(userId) {
    if (this.isLiked(userId)) {
      this.unlikeProfile(userId);
    } else {
      this.likeProfile(userId);
    }
  }

  likeProfile(liked_user) {
    this.like.getLiked().pipe(take(1)).subscribe( e => {this.likes = e.data; });
    this.like.postLike(liked_user).pipe(take(1)).subscribe(e => {
      if ((e as any).success === true) {
        this.profilesShown.forEach(element => {
          if (element.id === liked_user) {
            (element as any).like = true;
          }
        });
      }
    });
  }

  unlikeProfile(liked_user) {
    this.like.getLiked().pipe(take(1)).subscribe( e => {this.likes = e.data; });
    this.like.deleteLike((this.likes.find(e => (e as any).liked_user === liked_user) as any).id).
      pipe(take(1)).subscribe(e => {
      if ((e as any).success === true) {
        this.profilesShown.forEach(element => {
          if (element.id === liked_user) {
            (element as any).like = false;
          }
        });
      }
    });
  }

  isLiked(userId) {
    return this.likes.find(like => (like as any).liked_user === userId &&
      (like as any).liking_user + '' === this.jwTokenService.getUserId()) != null;
  }

  isBlocked(userId) {

  }

  isReported(userId) {

  }

  notificationError(error) {
    this.errorMessage = error;
    this.formError = true;
  }

  scrollToTop(top: HTMLElement) {
    top.scrollIntoView();
}

changeText() {
  if (this.hideFilter === 'Show Fiter') {
    this.hideFilter = 'Hide Filter';
  } else {
    this.hideFilter = 'Show Fiter';
  }
}

}
