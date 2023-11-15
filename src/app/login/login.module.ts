import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  exports: [ LoginFormComponent,RegistrationFormComponent, ResetpasswordComponent],
})
export class LoginModule { }
