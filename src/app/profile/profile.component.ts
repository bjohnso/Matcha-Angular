import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { take} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile : Profile = null;
  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfile().pipe(take(1)).subscribe(e => this.profile = e.data);
  }

}
