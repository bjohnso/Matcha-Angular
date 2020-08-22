import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [AuthComponent, LoginComponent, RegisterComponent]
})
export class AuthModule {}
