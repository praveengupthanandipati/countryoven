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
import { ReturnpolicyComponent } from '../pages/returnpolicy/returnpolicy.component';
import { PrivacypolicyComponent } from '../pages/privacypolicy/privacypolicy.component';
import { TermsandconditionsComponent } from '../pages/termsandconditions/termsandconditions.component';
import { NoproductsFoundComponent } from '../pages/noproducts-found/noproducts-found.component';
import { NotificationsComponent } from '../pages/home/notifications/notifications.component';
import { CustomgiftsComponent } from '../pages/customgifts/customgifts.component';
import { OopsComponent } from '../pages/404/404.component';
import { MothersDayCakesComponent } from '../pages/occasions/mothers-day-cakes/mothers-day-cakes.component';
import { RrevComponent } from '../pages/rrev/rrev.component';
import { MothersDayFlowersComponent } from '../pages/occasions/mothers-day-flowers/mothers-day-flowers.component';
import { MothersDayHampersComponent } from '../pages/occasions/mothers-day-hampers/mothers-day-hampers.component';
import { MothersDayGiftsComponent } from '../pages/occasions/mothers-day-gifts/mothers-day-gifts.component';
import { FathersDayCakesComponent } from '../pages/occasions/fathers-day-cakes/fathers-day-cakes.component';
import { FathersDayFlowersComponent } from '../pages/occasions/fathers-day-flowers/fathers-day-flowers.component';
import { FathersDayGiftsComponent } from '../pages/occasions/fathers-day-gifts/fathers-day-gifts.component';
import { FathersDayHampersComponent } from '../pages/occasions/fathers-day-hampers/fathers-day-hampers.component';
import { BakeryReviewsComponent } from '../pages/bakery-reviews/bakery-reviews.component';

const routes: Routes = [
  {
    path: '', component: FrontendComponent, children: [
      {path:'', component:HomeComponent},

      { path: '404', component: OopsComponent },
      { path: 'order/mothers-day-cakes-online', component: MothersDayCakesComponent },
      { path: 'order/mothers-day-flowers-online', component: MothersDayFlowersComponent },
      { path: 'order/mothers-day-gifts-online', component: MothersDayGiftsComponent },
      { path: 'order/mothers-day-hampers-online', component: MothersDayHampersComponent },

      { path: 'order/fathers-day-cakes-online', component: FathersDayCakesComponent },
      { path: 'order/fathers-day-flowers-online', component: FathersDayFlowersComponent },
      { path: 'order/fathers-day-gifts-online', component: FathersDayGiftsComponent },
      { path: 'order/fathers-day-hampers-online', component: FathersDayHampersComponent },



      {path: 'franchise', component:FranchisesComponent}, 
      {path:'home', redirectTo:'/'} ,
      {path: 'careers', component:CareersComponent},
      {path: 'customizedcakes', component:CustomizedCakesComponent},
      {path: 'corporateorders', component:CorporateOrdersComponent },

      { path: 'content/aboutus', component: AboutusComponent },
      
      {path:'content/ourstores', component:StoresComponent},
      {path: 'reviews', component:ReviewsComponent},
      { path: 'rrev/index/:id', component: RrevComponent },
      {path:'bakeryreview', component:BakeryReviewsComponent},
      {path:'customgifts', component:CustomgiftsComponent},
      {path: 'notifications', component:NotificationsComponent},
      {path: 'content/contactus', component:ContactComponent},  
      {path: 'content/couponpartners', component:CouponpartnersComponent},
      {path: 'content/customerservices', component:CustomerServicesComponent},
      {path: 'Help', component:HelpComponent},
      {path:'content/faq', component:FaqComponent},
      {path: 'content/shipping', component:ShippingComponent},
      {path: 'deliverycities', component:DeliverCitiesComponent},
      {path: 'content/returnpolicy', component:ReturnpolicyComponent},
      {path: 'content/privacypolicy', component:PrivacypolicyComponent},
      {path: 'content/termsandcondition', component:TermsandconditionsComponent},
      {path: 'pages/Noproducts', component:NoproductsFoundComponent},

      {path:'products-list', component:ProductListComponent},
      {path:':type/:cityname/:PageName', component:ProductsComponent},
      {path:':cityname1/:PageName1', component:ProductsComponent},
      {path:':favspl', component:ProductsComponent},
   
      // {path:':type/:cityname/:PageName', component:ProductListComponent},
      // {path:'product-detail/:PageName', component:ProductDetailComponent},
      // {path:':cityname/send-online/:PageName', component:ProductDetailComponent},
     
    ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
