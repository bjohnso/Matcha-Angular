import {Component, Input, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Profile} from '../models/profile.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent extends CoreComponent implements OnInit {

  profile: Profile;
  selectedCarouselImage: string;
  constructor() {
    super();
  }

  onCarouselImageEvent(event: Event, item: string) {
    if (event.type === 'mousedown') {
      this.selectedCarouselImage = this.selectedCarouselImage === item ? null : item;
    } else if (event.type === 'focusout' && this.selectedCarouselImage === item) {
      this.selectedCarouselImage = null;
    }
  }

  ngOnInit(): void {
    const data = history.state.profile || {};
    this.profile = new Profile(data);
  }

}
