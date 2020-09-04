import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { ViewProfileComponent } from './view-profile/view-profile.component';

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
        NgbDropdownModule
    ],
  exports: [ProfileComponent, EditProfileComponent]
})
export class ProfileModule {}
