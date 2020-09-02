import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {AuthGuardService} from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService]
  },
  {
    path: 'edit',
    component: EditProfileComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
