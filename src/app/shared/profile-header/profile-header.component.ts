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
  @Output() likeUserEvent = new EventEmitter();
  @Output() viewUserEvent = new EventEmitter();

  faPen = faPen;
  faBars = faBars;

  constructor() { }

  onUpdateProfileEventEvent(event: Event) {
    this.updateProfileEvent.emit(event);
  }

  onBlockEvent(event: Event) {
    this.blockUserEvent.emit(event);
  }

  onReportEvent(event: Event) {
    this.reportUserEvent.emit(event);
  }

  onLikeUser(event: Event) {
    this.likeUserEvent.emit(event);
  }

  onViewUser(event: Event) {
    this.viewUserEvent.emit(event);
  }

  ngOnInit(): void {
  }

}
