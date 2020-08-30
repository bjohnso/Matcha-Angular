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
  sortable : string[] = ['age', 'location', 'popularity'];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  formError = false;
  errorMessage = "";

  constructor(private profile : ProfileService) {}

  ngOnInit(): void {
    this.profile.getInterests().pipe(take(1)).subscribe(data => {
      this.interests = data["data"]['hobbies'];
    });
    this.formError = false;
    this.errorMessage = "";
  }
  


  onSubmit(form : NgForm){
    console.log(form.value)
    let sexual_preference, age: { min: any; max: any; }, 
    popularity: { min: any; max: any; }, radius: number, interests = null;
    
    if (form.value.sexual_preference && form.value.sexual_preference != '')
      sexual_preference = form.value.sexual_preference;

    if(form.value['age.min'] && form.value['age.max']){
      age = {min :form.value['age.min'] ,max : form.value['age.max']}
      if (age && 'min' in age && age.min > age.max || age.min < 0){
        this.notificationError('The age values are not correct');
        return;
      }
    }

    if (form.value['popularity.min'] && form.value['popularity.max']){
      popularity = {min :form.value['popularity.min'] ,max : form.value['popularity.max']};
      if (popularity && 'min' in popularity && popularity.min > popularity.max || popularity.min < 0){
        this.notificationError('The popularity values are not correct');
        return ;
      }
    }

    if (form.value.radius){
      radius = form.value.radius;
      if (radius && radius < 0 || radius > 400075){
        this.notificationError('The radius is below 0 or over what is possible');
        return ;
      }
    }

    if (form.value.interests && form.value.interests.length > 0)
      interests = form.value.interests;

    this.profile.getUserByFilter(radius, popularity,sexual_preference, interests, age).pipe(take(1)).subscribe((e) => {
      let data = e['data'];
      if (form.value.sortable){
         form.value['sortable'].forEach(element => {
          data = data.sort((a, b )=> {
            if (element == 'age')
              return (new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime());
            else if (element == 'location')
              return  ((a.location[0] - b.location[0]) || (a.location[1] - b.location[1]));
            else if (element == 'popularity')
              return a['popularity'] - b['popularity'];
           });
        });
      }
     
      this.profiles = data;
      this.collectionSize = this.profiles.length;
      this.refreshProfiles();
    })
  }

  refreshProfiles() {
    this.profilesShown = this.profiles
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.formError = false;
    this.errorMessage = "";
  }

  notificationError(error){
    this.errorMessage = error;
    this.formError = true;
  }
}
