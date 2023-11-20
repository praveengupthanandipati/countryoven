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
      {path:'content/aboutus', component:AboutusComponent},
      {path:'content/ourstores', component:StoresComponent},
      {path: 'reviews', component:ReviewsComponent},
      {path: 'content/contactus', component:ContactComponent},  
      {path: 'content/couponpartners', component:CouponpartnersComponent},
      {path: 'franchises', component:FranchisesComponent},  
      {path: 'careers', component:CareersComponent},
      {path: 'customizedcakes', component:CustomizedCakesComponent},
      {path: 'corporateorders', component:CorporateOrdersComponent },
      {path: 'content/customerservices', component:CustomerServicesComponent},
      {path: 'Help', component:HelpComponent},
      {path:'content/faq', component:FaqComponent},
      {path: 'content/shipping', component:ShippingComponent},
      {path: 'deliverycities', component:DeliverCitiesComponent}
    ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
