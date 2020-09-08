import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPen, faBars} from '@fortawesome/free-solid-svg-icons';
import {EmailValidator} from '@angular/forms';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() mode;
  @Input() profile;

  @Output() updateProfileEvent = new EventEmitter();
  @Output() blockUserEvent = new EventEmitter();
  @Output() reportUserEvent = new EventEmitter();

  faPen = faPen;
  faBars = faBars;

  constructor() { }

  onUpdateProfileEventEvent(event: Event) {
    this.updateProfileEvent.emit(event);
  }

  onBlockUser(event: Event) {
    this.blockUserEvent.emit(event);
  }

  onReportUser(event: Event) {
    this.reportUserEvent.emit(event);
  }

  ngOnInit(): void {
  }

}
