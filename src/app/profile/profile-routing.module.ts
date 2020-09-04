import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {ViewProfileComponent} from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full',
  },
  {
    path: 'default',
    component: ProfileComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService],
    children: [
      {
        path: 'view',
        component: ViewProfileComponent,
        outlet: 'profile',
        canActivate : [AuthGuardService],
        canLoad : [AuthGuardService]
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        outlet: 'profile',
        canActivate : [AuthGuardService],
        canLoad : [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
