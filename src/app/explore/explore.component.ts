import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  sexual_preferences : string [] = ['male', 'female' , 'both'];
  interests :string [] = [];
  selectedInterests :string []  = [];
  constructor(private profile : ProfileService) {}

  ngOnInit(): void {
    this.profile.getInterests().pipe(take(1)).subscribe(data => {
      this.interests = data["data"]['hobbies'];
    })
  }
  


  onSubmit(form : NgForm){
    console.log(form.value)
  }
}
