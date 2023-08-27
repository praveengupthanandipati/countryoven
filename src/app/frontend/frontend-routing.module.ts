import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from '../pages/aboutus/aboutus.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { CouponpartnersComponent } from '../pages/couponpartners/couponpartners.component';
import { FranchisesComponent } from '../pages/franchises/franchises.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ReviewsComponent } from '../pages/reviews/reviews.component';
import { StoresComponent } from '../pages/stores/stores.component';
import { FrontendComponent } from './frontend/frontend.component';

const routes: Routes = [
  {
    path: '', component: FrontendComponent, children: [
      {path:'', component:HomeComponent},
      {path:'products-list', component:ProductListComponent},
      {path:'product-detail', component:ProductDetailComponent},
      {path:'Aboutus', component:AboutusComponent},
      {path:'Stores', component:StoresComponent},
      {path: 'Reviews', component:ReviewsComponent},
      {path: 'Contact', component:ContactComponent},  
      {path: 'Coupon-Partners', component:CouponpartnersComponent},
      {path: 'Franchises', component:FranchisesComponent},  
    ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
