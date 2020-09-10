import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Profile, ProfileInterface} from '../models/profile.model';
import {ProfileService} from '../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {take} from 'rxjs/operators';
import {LikesService} from '../../services/likes.service';
import {JWTTokenService} from '../../services/jwt-token.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent extends CoreComponent implements OnInit {

  @ViewChild('inputImageUpload', {static: true}) inputImageRef: ElementRef;
  @ViewChild('inputBioUpdate', {static: true}) inputBioUpdateRef: ElementRef;
  profile: Profile;
  mode: any = {
    edit: false,
    visitor: false,
    viewing: true,
  };
  likes: [] = [];
  interests: string[];
  selectedCarouselImage: string;
  carouselButtonEvent = false;
  inputImageUpload: HTMLInputElement;
  inputBioUpdate: HTMLTextAreaElement;

  faPen = faPen;
  constructor(private profileService: ProfileService,
              private router: Router, private likeService: LikesService,
              private activatedRoute: ActivatedRoute, private jwtService: JWTTokenService) {
    super();
    this.activatedRoute.data.subscribe(data => {
      const profileData = data.profileData;
      this.profile = new Profile(profileData.profile as ProfileInterface);
      if (profileData.location) {
        this.profile.location = profileData.location;
      }
      this.interests = profileData.interests;
      this.mode.visitor = profileData.isVistor;
      this.mode.liked = profileData.isLiked;
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
            }).then();
          } else {
            console.log(error);
          }
        });
      });
    }
  }

  onLikeEvent(userId) {
    if (this.isLiked(userId)) {
      this.unlikeProfile(userId);
    } else {
      this.likeProfile(userId);
    }
  }

  likeProfile(liked_user) {
    this.likeService.getLiked().pipe(take(1)).subscribe( e => {this.likes = e.data; });
    this.likeService.postLike(liked_user).pipe(take(1)).subscribe(e => {
      if ((e as any).success) {
        console.log(e);
        this.refreshProfiles();
      }});
  }

  unlikeProfile(liked_user) {
    this.likeService.getLiked().pipe(take(1)).subscribe( e => {
      this.likes = e.data;
      this.likeService.deleteLike((this.likes.find(r => (r as any).liked_user === liked_user) as any).id).
      pipe(take(1)).subscribe(r => {
        if ((r as any).success === true) {
          console.log(r);
          this.refreshProfiles();
        }
      });
    });
  }

  isLiked(userId) {
    return this.likes.find(like => (like as any).liked_user === userId &&
      (like as any).liking_user + '' === this.jwtService.getUserId()) != null;
  }

  refreshProfiles() {
    this.likeService.getLiked().pipe(take(1)).subscribe( e => {
      console.log('Profile Refreshed');
      this.likes = e.data;
      this.mode.liked = this.isLiked(this.profile.id);
    });
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

  onBlockUser(event: Event) {
    this.profileService.blockUser(this.profile.id)
      .subscribe(result => {
        const {error, success} = result as any;
        if (success) {
          this.router.navigate([], {
            skipLocationChange: true,
          }).then();
        } else {
          console.log(error);
        }
      });
  }

  onReportUser(event: Event) {
    this.profileService.reportUser(this.profile.id)
      .subscribe(result => {
        const {error, success} = result as any;
        if (success) {
          this.router.navigate([], {
            skipLocationChange: true,
          }).then();
        } else {
          console.log(error);
        }
      });
  }

  ngOnInit(): void {
    this.inputImageUpload = this.inputImageRef.nativeElement as HTMLInputElement;
    this.inputBioUpdate = this.inputBioUpdateRef.nativeElement as HTMLTextAreaElement;
  }

}
