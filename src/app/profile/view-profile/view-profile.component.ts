import {Component, HostListener, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Profile} from '../models/profile.model';
import {ProfileService} from '../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent extends CoreComponent implements OnInit {

  profile: Profile;
  selectedCarouselImage: string;
  carouselButtonEvent = false;
  constructor(private profileService: ProfileService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  onCarouselImageEvent(event: Event, item: string) {
    if (event.type === 'mousedown') {
      this.selectedCarouselImage = this.selectedCarouselImage === item ? null : item;
    } else if (event.type === 'focusout' && this.selectedCarouselImage === item && !this.carouselButtonEvent) {
      this.selectedCarouselImage = null;
    }
  }

  onCarouselButtonEvent(event: Event) {
    if (event.type === 'mousedown') {
      console.log('MOUSE CLICK IN PROGRESS');
      this.carouselButtonEvent = true;
    } else if (event.type === 'click') {
      if (this.selectedCarouselImage) {
        // REMOVE IMAGE
        console.log('REMOVE - ' + this.selectedCarouselImage);
        // this.profileService.deleteImage(this.selectedCarouselImage)
        //   .subscribe(result => {
        //     const {error, success} = result as any;
        //     if (success) {
        //       this.router.navigate(['profile'],
        //         {
        //           relativeTo: this.activatedRoute.parent
        //         }).then();
        //     } else {
        //       console.log(error);
        //     }
        //   });
      } else {
        // ADD UPLOAD IMAGE
        console.log('ADD');
      }
      console.log('MOUSE CLICK COMPLETE - CLICK');
      this.carouselButtonEvent = false;
      this.selectedCarouselImage = null;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: Event) {
    if (this.carouselButtonEvent) {
      const elem = event.target as HTMLElement;
      if (elem.id !== 'carouselButton') {
        this.selectedCarouselImage = null;
        this.carouselButtonEvent = false;
      }
    }
  }

  ngOnInit(): void {
    const data = history.state.profile || {};
    this.profile = new Profile(data);
  }

}
