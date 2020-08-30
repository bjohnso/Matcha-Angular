import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import {Profile} from '../models/profile.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  sexual_preferences : string [] = ['male', 'female' , 'both'];
  interests :string [] = [];
  profiles : Profile [] = null;
  profilesShown : Profile [] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private profile : ProfileService) {}

  ngOnInit(): void {
    this.profile.getInterests().pipe(take(1)).subscribe(data => {
      this.interests = data["data"]['hobbies'];
    })
  }
  


  onSubmit(form : NgForm){
    console.log(form.value)
    let sexual_preference, age, popularity, radius, interests = null;
    
    if (form.value.sexual_preference && form.value.sexual_preference != '')
      sexual_preference = form.value.sexual_preference;

    if(form.value['age.min'] && form.value['age.max'])
      age = {min :form.value['age.min'] ,max : form.value['age.max']}

    if (form.value['popularity.min'] && form.value['popularity.max'])
      popularity = {min :form.value['popularity.min'] ,max : form.value['popularity.max']}

    if (form.value.radius)
      radius = form.value.radius;

    if (form.value.interests && form.value.interests.length > 0)
      interests = form.value.interests;
    
    this.profile.getUserByFilter(radius, popularity,sexual_preference, interests, age).pipe(take(1)).subscribe((e) => {
      this.profiles = e['data'];
      this.collectionSize = this.profiles.length;
      this.refreshProfiles();
    })
  }

  refreshProfiles() {
    this.profilesShown = this.profiles
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
