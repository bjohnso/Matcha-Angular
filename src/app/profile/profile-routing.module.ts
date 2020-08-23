import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full',
  },
  {
    path: 'default',
    component: ProfileComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
        outlet: 'profile',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
