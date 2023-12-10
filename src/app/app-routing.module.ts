import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegistrationFormComponent } from './login/registration-form/registration-form.component';
import { ResetpasswordComponent } from './login/resetpassword/resetpassword.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ChangepasswordComponent } from './profile/changepassword/changepassword.component';
import { UserAddressComponent } from './profile/user-address/user-address.component';
import { UserOrderDetailComponent } from './profile/user-order-detail/user-order-detail.component';
import { UserOrdersComponent } from './profile/user-orders/user-orders.component';
import { UserVouchersComponent } from './profile/user-vouchers/user-vouchers.component';


const routes: Routes = [
  {path:'login', component:LoginFormComponent},
  
  {path:'signup', component:RegistrationFormComponent},  
  {path:'reset', component:ResetpasswordComponent} ,
  {path:'cart', loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)},  
  {path:'profile', loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)},

  {path:'my_profile', component:UserProfileComponent},
  {path:'orders', component:UserOrdersComponent},
  {path:'user-order-detail', component:UserOrderDetailComponent},
  {path: 'user-address', component:UserAddressComponent},
  {path: 'user-change-password', component:ChangepasswordComponent},
  {path: 'user-vouchers', component:UserVouchersComponent},
  {path:'', loadChildren:()=>import('./frontend/frontend.module').then(m=>m.FrontendModule)},
  {path:'', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},  
  

  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],  
})
export class AppRoutingModule { }
