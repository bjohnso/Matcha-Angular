import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
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
    EditProfileComponent,
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
  exports: [ProfileComponent, ViewProfileComponent, EditProfileComponent],
  providers: [
    NgxImageCompressService
  ]
})
export class ProfileModule {}
