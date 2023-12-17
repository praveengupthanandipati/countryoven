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

const routes: Routes = [
  { path: '', redirectTo: '/myaccount/dashboard', pathMatch: 'full' },
  { path: '', component: MyaccountComponent, children: [
    {path:'dashboard', component:UserDashboardComponent},
    {path:'my_profile', component:UserProfileComponent},
  {path:'orders', component:UserOrdersComponent},
  {path:'orderdetails/:id', component:UserOrderDetailComponent},
  {path: 'user-address', component:UserAddressComponent},
  {path: 'user-change-password', component:ChangepasswordComponent},
  {path: 'cowallet', component:CowalletComponent},
  {path: 'referral', component:ReferralComponent}
  ],
},
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})

export class ProfileRoutingModule { }
