import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {UserComponent} from './user.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    UserComponent,
    NotificationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    FontAwesomeModule,
    NgSelectModule,
    SharedModule
  ],
  exports: [UserComponent, NotificationComponent],
  providers: [
  ]
})
export class UserModule {}
