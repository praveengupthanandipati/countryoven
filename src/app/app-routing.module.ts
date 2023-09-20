import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./frontend/frontend.module').then(m=>m.FrontendModule)},  
  {path:'Login', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},  
  {path:'Cart', loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)},  
  {path:'Profile', loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],  
})
export class AppRoutingModule { }
