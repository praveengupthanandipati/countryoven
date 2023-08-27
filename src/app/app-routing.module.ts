import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./frontend/frontend.module').then(m=>m.FrontendModule)},  
  {path:'login', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},  
  {path:'cart', loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
