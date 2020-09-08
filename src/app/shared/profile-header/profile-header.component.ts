import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() editMode;
  @Input() visitorMode;
  @Input() profile;

  @Output() updateProfileEvent = new EventEmitter();

  faPen = faPen;

  constructor() { }

  ngOnInit(): void {
  }

}
