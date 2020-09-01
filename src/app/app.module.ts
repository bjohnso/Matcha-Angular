import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreComponent } from './explore/explore.component';
import { ChatComponent } from './chat/chat.component';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProfileModule} from './profile/profile.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {NgSelectModule} from '@ng-select/ng-select';
import {environment} from '../environments/environment';
import { HeaderComponent } from './shared/header/header.component';
import {SharedModule} from './shared/shared.module';

// temporary for testing
// tslint:disable-next-line:max-line-length
const config: SocketIoConfig = { url: environment.api.baseURL, options: {query : {token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzLCJpYXQiOjE1OTg1MjI1MzR9.tYa0OB9dm0gLwABXofuMRIW45e8G06GbW1IH0kBeCes'}}};
// const config: SocketIoConfig = { url: environment.api.baseURL, options: {query : {token : JWTTokenService.jwtToken}}};
@NgModule({
  declarations: [
    AppComponent,
    // TODO: CREATE MODULES AND ROUTING FLOWS FOR THESE ROGUE COMPONENTS
    ExploreComponent,
    ChatComponent,
  ],
  imports: [
    NgbModule,
    NgSelectModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    // CUSTOM
    CoreModule,
    SharedModule,
    AuthModule,
    ProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
