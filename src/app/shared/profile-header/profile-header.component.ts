import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPen, faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() mode;
  @Input() profile;

  @Output() updateProfileEvent = new EventEmitter();

  faPen = faPen;
  faBars = faBars;

  constructor() { }

  onUpdateProfileEventEvent(event: Event) {
    this.updateProfileEvent.emit(event);
  }

  ngOnInit(): void {
  }

}
