import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Profile, ProfileInterface} from '../models/profile.model';
import {ProfileService} from '../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent extends CoreComponent implements OnInit {

  @ViewChild('inputImageUpload', {static: true}) inputImageRef: ElementRef;
  @ViewChild('inputBioUpdate', {static: true}) inputBioUpdateRef: ElementRef;
  profile: Profile;
  mode = {
    edit: false,
    visitor: false,
  };
  interests: string[];
  selectedCarouselImage: string;
  carouselButtonEvent = false;
  inputImageUpload: HTMLInputElement;
  inputBioUpdate: HTMLTextAreaElement;

  faPen = faPen;
  constructor(private profileService: ProfileService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    super();
    this.activatedRoute.data.subscribe(data => {
      const profileData = data.profileData;
      this.profile = new Profile(profileData.profile.data as ProfileInterface);
      console.log(this.profile);
      this.interests = profileData.interests.data.hobbies;
      this.mode.visitor = profileData.isVistor;
    });
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
      const button = event.target as HTMLButtonElement;
      const id = button.id;
      if (id === 'carouselUpdateImageButton') {
        if (this.selectedCarouselImage) {
          // REMOVE IMAGE
          this.profileService.deleteImage(this.selectedCarouselImage)
            .subscribe(result => {
              const {error, success} = result as any;
              if (success) {
                this.router.navigate([], {
                  skipLocationChange: true,
                  queryParamsHandling: 'merge'
                }).then();
              } else {
                console.log(error);
              }
            });
        } else {
          // OPEN FILE CHOOSER
          this.inputImageUpload.click();
        }
      } else if (id === 'carouselProfileImageButton' && this.selectedCarouselImage) {
        // MAKE PROFILE IMAGE
        this.profileService.updateProfileImage(this.selectedCarouselImage)
          .subscribe(result => {
            const {error, success} = result as any;
            if (success) {
              this.router.navigate([], {
                skipLocationChange: true,
                queryParamsHandling: 'merge'
              }).then();
            } else {
              console.log(error);
            }
          });
      }
      this.carouselButtonEvent = false;
      this.selectedCarouselImage = null;
    }
  }

  onUpdateProfileEventEvent(event: Event) {
    if (this.mode.edit) {
      this.mode.edit = false;
      this.profile.description = this.inputBioUpdate.value.toString();
      this.profileService.updateProfile(this.profile)
       .subscribe(result => {
         const {error, success} = result as any;
         if (success) {
           this.router.navigate([], {
             skipLocationChange: true,
             queryParamsHandling: 'merge'
           }).then();
         } else {
           console.log(error);
         }
       });
    }
  }

  onImageSelected(event: Event) {
    const imageUpload: HTMLInputElement = event.target as HTMLInputElement;
    if (imageUpload.files && imageUpload.files.length === 1) {
      this.profileService.uploadImage(imageUpload.files[0]).then(request => {
        request.subscribe(result => {
          const {error, success} = result as any;
          if (success) {
            this.router.navigate([], {
              skipLocationChange: true,
              queryParamsHandling: 'merge'
            }).then();
          } else {
            console.log(error);
          }
        });
      });
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: Event) {
    if (this.carouselButtonEvent) {
      const elem = event.target as HTMLElement;
      if (elem.id !== 'carouselUpdateImageButton' &&
        elem.id !== 'carouselProfileImageButton') {
        this.selectedCarouselImage = null;
        this.carouselButtonEvent = false;
      }
    }
  }

  ngOnInit(): void {
    this.inputImageUpload = this.inputImageRef.nativeElement as HTMLInputElement;
    this.inputBioUpdate = this.inputBioUpdateRef.nativeElement as HTMLTextAreaElement;
    // const data = history.state.profile || {};
    // this.profile = new Profile(data);
  }

}
