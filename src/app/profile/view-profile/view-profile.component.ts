import {Component, Input, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Profile} from '../models/profile.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent extends CoreComponent implements OnInit {

  @Input() profile: Profile;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
