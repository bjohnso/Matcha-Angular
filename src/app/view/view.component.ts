import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/services/profile.service';
import { LikesService } from '../services/likes.service';
import { VisitService } from '../services/visit.service';
import { MatchService } from '../services/match.service';
import { Profile } from '../profile/models/profile.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  profiles : Profile [] = [];
  tabSelection : string;
  profileSelect :Profile;

  constructor(private profileService : ProfileService, private likeService : LikesService,
              private visitService : VisitService, private matchService : MatchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.queryParams.pipe(take(1)).subscribe(
      async params => {
        this.profileService.getUserById(params.profile).pipe(take(1)).subscribe(
          e => {
            if (e['success'])
              this.profileSelect = e['data'][0];
          })
      }
    )

    this.tabSelection = 'match';
    this.tabSelect();
  }

  getVisitData(){
    this.profileService.getProfilesByVisits().pipe(take(1)).subscribe(
      e => {
        if (e['success'] == true){
          this.profiles = e['data'];
          
          this.visitService.getVisits().pipe(take(1)).subscribe(e => {
            this.profiles.forEach(element => {
              let temp = e['data'].find(g => g['visitor'] == element.id);
              element['date'] = temp['data'];
              element['visit_id'] = temp['id'];
            })
          })
        }
      }
    )
  }

  getLikesData(){
    this.profileService.getProfilesByLikes().pipe(take(1)).subscribe(
      e => {
        if (e['success'] == true){
          this.profiles = e['data'];
          
          this.likeService.getLikes().pipe(take(1)).subscribe(e => {
            this.profiles.forEach(element => {
              let temp = e['data'].find(g => g['liking_user'] == element.id);
              element['date'] = temp['date'];
              element['like_id'] = temp['id'];
            });
        });
      }
      });
  }

  getMatchData(){
    this.profileService.getProfilesByMatches().pipe(take(1)).subscribe(
      e => {
        if (e['success'] == true){
          this.profiles = e['data'];
          
          this.matchService.getMatches().pipe(take(1)).subscribe(e => {
            this.profiles.forEach(element => {
              let temp = e['data'].find(g =>(g['user1'] == element.id || g['user2'] == element.id) );
              element['date'] = temp['date'];
              element['match_id'] = temp['id'];
            });
        });
      }});
  }

  unlikeUser(profile){
    return this.likeService.deleteLike(profile.id).pipe(take(1)).subscribe(e=> {
      if (e['success']){
        profile['like_id'] = 0;
        this.profiles.filter(a => a.id != profile.id);
      }
    });
  }

  unmatchUser(profile){
    return this.matchService.deleteMatch(profile.id).pipe(take(1)).subscribe(e=> {
      if (e['success']){
        this.profiles.filter(a => a.id != profile.id);
        profile['match_id'] = 0;
        profile['like_id'] = 0;
      }
    });
  }

  likeUser(profile){
    return this.likeService.postLike(profile.id).pipe(take(1)).subscribe(e => {
      if (e['success']){
        profile['like'] = e['data']['like_id'];
        profile['match_id'] = e['data']['match_id'];
        profile['date'] = new Date();
      }
    })
  }

  showProfile(profile){
    this.matchService.getLikeMatch(profile.id).pipe(take(1)).subscribe(e =>{
      if (e.success){
        if ('date' in e.data && e.data['date'])
          profile['date'] = e.data['date'];
        else
          profile['date'] = null;

        if ('like_id' in e.data && e.data['like_id'])
          profile['like_id'] = e.data['like_id'];
        else
          profile['like_id'] = null;

        if ('match_id' in e.data && e.data['match_id'])
          profile['match_id'] = e.data['match_id'];
        else
          profile['match_id'] = null;
      }
    })
  }

  tabSelect(){
    switch(this.tabSelection){
      case 'match' :{
        this.getMatchData();
        break;
      }
      case 'visit' :{
        this.getVisitData();
        break;
      }
      case 'like' :{
        this.getLikesData();
        break;
      }
    }
  }
  



}
