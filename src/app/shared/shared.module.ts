import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {CommonModule} from '@angular/common';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, ProfileHeaderComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbDropdownModule,
        RouterModule
    ],
  exports: [HeaderComponent, ProfileHeaderComponent]
})
export class SharedModule {}
