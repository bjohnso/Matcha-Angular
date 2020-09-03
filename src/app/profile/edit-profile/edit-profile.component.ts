import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {SEXUAL_PREFERENCE, GENDER, SEXUAL_ORIENTATION} from '../../data/profile.data';
import {Profile} from '../models/profile.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends CoreComponent implements OnInit {

  protected GENDER = GENDER;
  protected SEXUAL_PREFERENCE = SEXUAL_PREFERENCE;
  protected SEXUAL_ORIENTATION = SEXUAL_ORIENTATION;
  protected profile: Profile;
  constructor() {
    super();
  }

  inputEvent() {
  }

  ngOnInit(): void {
  }

}
