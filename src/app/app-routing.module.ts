import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegistrationFormComponent } from './login/registration-form/registration-form.component';
import { ResetpasswordComponent } from './login/resetpassword/resetpassword.component';


const routes: Routes = [
  {path:'login', component:LoginFormComponent},
  
  {path:'signup', component:RegistrationFormComponent},  
  {path:'reset', component:ResetpasswordComponent} ,
  {path:'cart', loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)},  
  {path:'profile', loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)},
  {path:'', loadChildren:()=>import('./frontend/frontend.module').then(m=>m.FrontendModule)},
  {path:'', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},  
  

  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],  
})
export class AppRoutingModule { }
