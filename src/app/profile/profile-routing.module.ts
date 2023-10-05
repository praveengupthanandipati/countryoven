import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserOrderDetailComponent } from './user-order-detail/user-order-detail.component';
import { UserAddressComponent } from './user-address/user-address.component';

const routes: Routes = [
  {path:'', component:UserDashboardComponent},  
  {path:'My Profile', component:UserProfileComponent},
  {path:'Orders', component:UserOrdersComponent},
  {path:'User-Order-Detail', component:UserOrderDetailComponent},
  {path: 'User-Address', component:UserAddressComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})

export class ProfileRoutingModule { }
