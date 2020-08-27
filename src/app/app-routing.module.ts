import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {ChatComponent} from './chat/chat.component'

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'profile', loadChildren: () => import('./profile/profile-routing.module').then(m => m.ProfileRoutingModule)},
  {
    path: 'auth',
    component: AuthComponent,
  },
  {path: 'chat', component : ChatComponent}
  // {
  //   path: 'auth',
  //   component: AuthComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
