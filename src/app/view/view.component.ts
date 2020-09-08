import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/services/profile.service';
import { LikesService } from '../services/likes.service';
import { VisitService } from '../services/visit.service';
import { MatchService } from '../services/match.service';
import { Profile } from '../profile/models/profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
// import * as $ from 'jquery';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  profiles : Profile [] = [];
  tabSelection : string;
  profileSelect ;

  constructor(private profileService : ProfileService, private likeService : LikesService, private route : Router,
              private visitService : VisitService, private matchService : MatchService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    if (this.actRoute.queryParams || this.actRoute.queryParams != undefined){
       this.actRoute.queryParams.pipe(take(1)).subscribe(
          async params => {
            console.log(params)
            this.profileService.getUserById(params.profile).pipe(take(1)).subscribe(
              e => {
                console.log(e);
                if (e['success'])
                  this.showProfile(e['data'][0]);
              })
          }
      )
    }
   

    // //Toggle Click Function
    // $("#menu-toggle").click(function(e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    // });


    this.tabSelection = 'like';
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
    return this.likeService.deleteLike(profile.like_id).pipe(take(1)).subscribe(e=> {
      if (e['success']){
        profile['like_id'] = null;
        this.profiles.filter(a => a.id != profile.id);
      }
    });
  }

  unmatchUser(profile){
    return this.matchService.deleteMatch(profile.match_id).pipe(take(1)).subscribe(e=> {
      if (e['success']){
        this.profiles.filter(a => a.id != profile.id);
        profile['match_id'] = null;
        profile['like_id'] = null;
      }
    });
  }

  likeUser(profile){
    return this.likeService.postLike(profile.id).pipe(take(1)).subscribe(e => {
      if (e['success']){
        profile['like_id'] = e['data']['like_id'];
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
      this.profileSelect = profile;
      console.log(this.profileSelect);
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

  goToChat(profile){
    const match_id = profile.match_id
    delete profile.match_id;
    delete profile.like_id;
    delete profile.date;
    console.log(profile);
    this.route.navigate(['/chat'], {queryParams : {profile : profile.username, match_id :match_id}})
  }
  
   openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

 closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}
