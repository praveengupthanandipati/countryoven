import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  {path:'', component:UserDashboardComponent},  
  {path:'My Profile', component:UserProfileComponent},
  {path:'Orders', component:UserOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})

export class ProfileRoutingModule { }
