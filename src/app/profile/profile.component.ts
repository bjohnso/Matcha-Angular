import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {}

}
