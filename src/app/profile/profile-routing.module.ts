import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {ProfileResolverService} from '../services/profile-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'view',
        component: ViewProfileComponent,
        resolve: {profile: ProfileResolverService},
        canActivate : [AuthGuardService],
        canLoad : [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        resolve: {profile: ProfileResolverService},
        canActivate : [AuthGuardService],
        canLoad : [AuthGuardService],
        runGuardsAndResolvers: 'always',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
