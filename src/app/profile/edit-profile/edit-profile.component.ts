import { Component, OnInit } from '@angular/core';
import {CoreComponent} from '../../core/core.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends CoreComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
  }

}
