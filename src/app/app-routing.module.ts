import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {ChatComponent} from './chat/chat.component'
import { ExploreComponent } from './explore/explore.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ViewComponent} from './view/view.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile-routing.module')
      .then(m => m.ProfileRoutingModule),
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService]
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'chat',
    component : ChatComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'explore',
    component : ExploreComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'view',
    component : ViewComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'notification',
    component : NotificationsComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService],
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
