import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from '../services/auth-guard.service';
import {UserComponent} from './user.component';
import {ChatComponent} from '../chat/chat.component';
import {NotificationComponent} from './notification/notification.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
      {
        path: 'notification',
        component: NotificationComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuardService],
        canLoad: [AuthGuardService],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
