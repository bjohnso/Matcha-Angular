import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ExploreComponent } from './explore/explore.component';
import { AuthGuardService } from './services/auth-guard.service';
import {ChatComponent} from './chat/chat.component';
import {ChatResolverService} from './chat/services/chat-resolver.service';
import {ChatGuardService} from './chat/services/chat-guard.service';
import {NotificationsComponent} from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/(matcha:auth)',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    outlet: 'matcha',
    component: AuthComponent,
  },
  {
    path: 'explore',
    outlet: 'matcha',
    component : ExploreComponent,
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'profile/:id',
    // redirectTo: 'profile/:id(notification:notification)',
    outlet: 'matcha',
    loadChildren: () => import('./profile/profile-routing.module')
      .then(m => m.ProfileRoutingModule),
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService]
  },
  {
    path: 'chat/:id/:match_id',
    component: ChatComponent,
    outlet: 'chat',
    resolve: {chatData: ChatResolverService},
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardService, ChatGuardService],
    canLoad: [AuthGuardService],
  },
  {
    path: 'notification',
    component: NotificationsComponent,
    outlet: 'notification',
    canActivate : [AuthGuardService],
    canLoad : [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
