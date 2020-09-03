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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProfileModule} from './profile/profile.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {NgSelectModule} from '@ng-select/ng-select';
import {environment} from '../environments/environment';;
import {SharedModule} from './shared/shared.module';
import {InterceptorService} from './services/interceptor.service';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';

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
    NgSelectModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,

    // THIRD PARTY
    SocketIoModule.forRoot(config),
    NgbModule,

    // CUSTOM
    CoreModule,
    SharedModule,
    AuthModule,
    ProfileModule,
  ],
  providers: [
    // THE INTERCEPTOR WILL CATCH ALL HTTP REQUESTS AND ADD AN AUTH TOKEN WHERE APPLICABLE
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS,
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
