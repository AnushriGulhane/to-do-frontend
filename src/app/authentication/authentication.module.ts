import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SharedLibModule } from '../shared-lib/shared-lib.module';


@NgModule({
  declarations: [SignupComponent, SigninComponent, ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedLibModule,
  ]
})
export class AuthenticationModule { }
