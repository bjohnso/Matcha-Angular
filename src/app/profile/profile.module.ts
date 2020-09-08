import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {PersonalDetailsComponent} from './view-profile/personal-details/personal-details.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ProfileComponent,
    PersonalDetailsComponent,
    ViewProfileComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    FontAwesomeModule,
    NgSelectModule
  ],
  exports: [ProfileComponent, ViewProfileComponent, PersonalDetailsComponent],
  providers: [
    NgxImageCompressService
  ]
})
export class ProfileModule {}
