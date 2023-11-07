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

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserProfileComponent,
    ProfileNavComponent,
    UserOrdersComponent,
    UserOrderDetailComponent,
    UserAddressComponent,
    ChangepasswordComponent,
    UserVouchersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,   
    ProfileRoutingModule  
  ],
  exports: [ UserDashboardComponent],
})
export class ProfileModule { }
