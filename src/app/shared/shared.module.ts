import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {CommonModule} from '@angular/common';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HeaderComponent, ProfileHeaderComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [HeaderComponent, ProfileHeaderComponent]
})
export class SharedModule {}
