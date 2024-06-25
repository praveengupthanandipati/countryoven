import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserOrderDetailComponent } from './user-order-detail/user-order-detail.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UserVouchersComponent } from './user-vouchers/user-vouchers.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { CowalletComponent } from './cowallet/cowallet.component';
import { ReferralComponent } from './referral/referral.component';
import { RrevComponent } from '../pages/rrev/rrev.component';
import { BakeryReviewsComponent } from '../pages/bakery-reviews/bakery-reviews.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserProfileComponent,
    ProfileNavComponent,
    UserOrdersComponent,
    RrevComponent,
    UserOrderDetailComponent,
    UserAddressComponent,
    ChangepasswordComponent,
    UserVouchersComponent,
    MyaccountComponent,
    CowalletComponent,
    ReferralComponent,
    BakeryReviewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,   
    ProfileRoutingModule  
  ],
  exports: [ UserDashboardComponent],
})
export class ProfileModule { }
