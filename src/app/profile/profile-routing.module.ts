import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserOrderDetailComponent } from './user-order-detail/user-order-detail.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UserVouchersComponent } from './user-vouchers/user-vouchers.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { CowalletComponent } from './cowallet/cowallet.component';
import { ReferralComponent } from './referral/referral.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/myaccount/dashboard', pathMatch: 'full' },
  { path: '', component: MyaccountComponent, children: [
    {path:'dashboard', component:UserDashboardComponent, canActivate: [AuthGuard]},
    {path:'my_profile', component:UserProfileComponent, canActivate: [AuthGuard]},
  {path:'orders', component:UserOrdersComponent, canActivate: [AuthGuard]},
  {path:'orderdetails/:id', component:UserOrderDetailComponent,canActivate: [AuthGuard]},
  {path: 'user-address', component:UserAddressComponent, canActivate: [AuthGuard]},
  {path: 'user-change-password', component:ChangepasswordComponent, canActivate: [AuthGuard]},
  {path: 'cowallet', component:CowalletComponent},
  {path: 'referral', component:ReferralComponent, canActivate: [AuthGuard]}
  ],
},
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})

export class ProfileRoutingModule { }
