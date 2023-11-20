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
import { ProductsComponent } from '../pages/products/products.component';
import { CareersComponent } from '../pages/careers/careers.component';
import { CustomizedCakesComponent } from '../pages/customized-cakes/customized-cakes.component';
import { CorporateOrdersComponent } from '../pages/corporate-orders/corporate-orders.component';
import { CustomerServicesComponent } from '../pages/customer-services/customer-services.component';
import { HelpComponent } from '../pages/help/help.component';
import { FaqComponent } from '../pages/faq/faq.component';
import { ShippingComponent } from '../pages/shipping/shipping.component';
import { DeliverCitiesComponent } from '../pages/deliver-cities/deliver-cities.component';

const routes: Routes = [
  {
    path: '', component: FrontendComponent, children: [
      {path:'', component:HomeComponent},
      {path:'products-list', component:ProductListComponent},
      {path:':type/:cityname/:PageName', component:ProductsComponent},
   
      // {path:':type/:cityname/:PageName', component:ProductListComponent},
      // {path:'product-detail/:PageName', component:ProductDetailComponent},
      // {path:':cityname/send-online/:PageName', component:ProductDetailComponent},
      {path:'Aboutus', component:AboutusComponent},
      {path:'Stores', component:StoresComponent},
      {path: 'Reviews', component:ReviewsComponent},
      {path: 'Contact', component:ContactComponent},  
      {path: 'Coupon-Partners', component:CouponpartnersComponent},
      {path: 'Franchises', component:FranchisesComponent},  
      {path: 'Careers', component:CareersComponent},
      {path: 'Customized-Cakes', component:CustomizedCakesComponent},
      {path: 'Corporate-Orders', component:CorporateOrdersComponent },
      {path: 'Customer-Services', component:CustomerServicesComponent},
      {path: 'Help', component:HelpComponent},
      {path:'FAQ', component:FaqComponent},
      {path: 'Shipping', component:ShippingComponent},
      {path: 'Delivery-Cities', component:DeliverCitiesComponent}
    ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
