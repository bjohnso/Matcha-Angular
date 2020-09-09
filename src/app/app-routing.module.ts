import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ExploreComponent } from './explore/explore.component';
import { AuthGuardService } from './services/auth-guard.service';
import {ChatComponent} from './profile/chat/chat.component';
import {ChatResolverService} from './profile/services/chat-resolver.service';

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
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
  },
  // {
  //   path: 'user',
  //   outlet: 'user',
  //   loadChildren: () => import('./user/user-routing.module')
  //     .then(m => m.UserRoutingModule),
  //   canActivate : [AuthGuardService],
  //   canLoad : [AuthGuardService]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
