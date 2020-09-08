import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { NgxImageCompressService } from 'ngx-image-compress';
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
import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {InterceptorService} from './services/interceptor.service';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import { NotificationsComponent } from './notifications/notifications.component';
import {ViewComponent} from './view/view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JWTTokenService } from './services/jwt-token.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// temporary for testing
// tslint:disable-next-line:max-line-length
const token = localStorage.getItem('user');
const config: SocketIoConfig = { url: environment.api.baseURL, options: {query : {token}}};
@NgModule({
  declarations: [
    AppComponent,
    // TODO: CREATE MODULES AND ROUTING FLOWS FOR THESE ROGUE COMPONENTS
    ExploreComponent,
    ChatComponent,
    NotificationsComponent,
    ViewComponent,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,

    // THIRD PARTY
    SocketIoModule.forRoot(config),
    NgbModule,

    // CUSTOM
    CoreModule,
    SharedModule,
    AuthModule,
    ProfileModule,
    FontAwesomeModule,
    NgxSpinnerModule
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
    JwtHelperService,
    NgxImageCompressService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
