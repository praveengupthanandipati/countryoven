import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';




const routes: Routes = [
  {path:'', component:LoginFormComponent},
  {path:'signup', component:RegistrationFormComponent},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class LoginRoutingModule { }
