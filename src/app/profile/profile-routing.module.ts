import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {ProfileResolverService} from './services/profile-resolver.service';
import {ProfileGuardService} from './services/profile-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'view',
        component: ViewProfileComponent,
        resolve: {profileData: ProfileResolverService},
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuardService, ProfileGuardService],
        canLoad: [AuthGuardService],
      },
      {
        path: 'settings',
        component: ViewProfileComponent,
        resolve: {profileData: ProfileResolverService},
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuardService, ProfileGuardService],
        canLoad: [AuthGuardService],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
