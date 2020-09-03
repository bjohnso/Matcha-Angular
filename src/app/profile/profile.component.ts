import { Component, OnInit } from '@angular/core';
import { Profile } from './models/profile.model';
import { ProfileService } from './services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.profileService.getProfile()
      .subscribe(result => {
        console.log(result);
        this.router.navigate(
          [{outlets: {profile : 'edit'}}],
          {
            relativeTo: this.activatedRoute,
            state: {profile : result.data}
          })
          .then();
    });
  }

}
