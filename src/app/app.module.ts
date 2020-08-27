import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreComponent } from './explore/explore.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedComponent } from './shared/shared.component';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import {ProfileModule} from './profile/profile.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {environment} from '../environments/environment'
 
//temporary for testing
const config: SocketIoConfig = { url: environment.api.baseURL, options: {query : {token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzLCJpYXQiOjE1OTg1MjI1MzR9.tYa0OB9dm0gLwABXofuMRIW45e8G06GbW1IH0kBeCes'}}};

@NgModule({
  declarations: [
    AppComponent,
    ExploreComponent,
    ChatComponent,
    SharedComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    // CUSTOM
    CoreModule,
    AuthModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
