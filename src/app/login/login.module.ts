import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ],
  exports: [ LoginFormComponent,
    RegistrationFormComponent],
})
export class LoginModule { }
