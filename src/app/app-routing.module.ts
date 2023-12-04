import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'cart', loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)},  
  {path:'profile', loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)},
  {path:'', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},  
  {path:'', loadChildren:()=>import('./frontend/frontend.module').then(m=>m.FrontendModule)},  
  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],  
})
export class AppRoutingModule { }
