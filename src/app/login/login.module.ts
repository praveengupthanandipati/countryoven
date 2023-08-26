import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  {path:'login', component:LoginFormComponent},
  {path:'register', component:RegistrationFormComponent}
];

@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
