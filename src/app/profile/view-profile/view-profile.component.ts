import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('inputImageUpload', {static: true}) inputImageRef: ElementRef;
  profile: Profile;
  selectedCarouselImage: string;
  carouselButtonEvent = false;
  inputImageUpload: HTMLInputElement;
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
      this.carouselButtonEvent = true;
    } else if (event.type === 'click') {
      if (this.selectedCarouselImage) {
        // REMOVE IMAGE
        this.profileService.deleteImage(this.selectedCarouselImage)
          .subscribe(result => {
            const {Error, success} = result as any;
            if (success) {
              this.router.navigate(['profile'])
                .then();
            } else {
              console.log(Error);
            }
          });
      } else {
        // OPEN FILE CHOOSER
        this.inputImageUpload.click();
      }
      this.carouselButtonEvent = false;
      this.selectedCarouselImage = null;
    }
  }

  onImageSelected(event: Event) {
    const imageUpload: HTMLInputElement = event.target as HTMLInputElement;
    if (imageUpload.files && imageUpload.files.length === 1) {
      this.profileService.uploadImage(imageUpload.files[0]).then(request => {
        request.subscribe(result => {
          const {Error, success} = result as any;
          if (success) {
            this.router.navigate(['profile'])
              .then();
          } else {
            console.log(Error);
          }
        });
      });
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
    this.inputImageUpload = this.inputImageRef.nativeElement as HTMLInputElement;
    const data = history.state.profile || {};
    this.profile = new Profile(data);
  }

}
