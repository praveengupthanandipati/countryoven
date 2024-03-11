import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { FrontendComponent } from './frontend/frontend.component';
import { HomeComponent } from '../pages/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { CategoryItemComponent } from '../components/category-item/category-item.component';
import { MainnavComponent } from '../components/header/mainnav/mainnav.component';
import { MidheaderComponent } from '../components/header/midheader/midheader.component';
import { TopheaderComponent } from '../components/header/topheader/topheader.component';
import { ProductItemComponent } from '../components/product-item/product-item.component';
import { AboutusComponent } from '../pages/aboutus/aboutus.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { CouponpartnersComponent } from '../pages/couponpartners/couponpartners.component';
import { FranchisesComponent } from '../pages/franchises/franchises.component';
import { CategoriesComponent } from '../pages/home/categories/categories.component';
import { CategoryBannersComponent } from '../pages/home/category-banners/category-banners.component';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ReviewsComponent } from '../pages/reviews/reviews.component';
import { StoresComponent } from '../pages/stores/stores.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from '../pages/products/products.component';
import { CustomizedCakesComponent } from '../pages/customized-cakes/customized-cakes.component';
import { NoproductsFoundComponent } from '../pages/noproducts-found/noproducts-found.component';
import { TermsContentComponent } from '../pages/home/terms-content/terms-content.component';
import { NotificationsComponent } from '../pages/home/notifications/notifications.component';
import { TrackComponent } from '../pages/track/track.component';
import { CorporateOrdersComponent } from '../pages/corporate-orders/corporate-orders.component';
 
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CustomgiftsComponent } from '../pages/customgifts/customgifts.component';
@NgModule({
  declarations: [
    FrontendComponent,
   // HeaderComponent,
    // FooterComponent,
    HomeComponent,
    // TopheaderComponent,
    // MidheaderComponent,
    // MainnavComponent,
    CategoriesComponent,
    CategoryBannersComponent,
   // ProductItemComponent,
    CategoryItemComponent,
    ProductListComponent,
    ProductDetailComponent,
    AboutusComponent,
    StoresComponent,
    ReviewsComponent,
    ContactComponent,
    CouponpartnersComponent,
    FranchisesComponent,  
    CustomizedCakesComponent,
    ProductsComponent,
    NoproductsFoundComponent,
    TermsContentComponent,
    NotificationsComponent,
    TrackComponent,
    CorporateOrdersComponent,
    CustomgiftsComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxImageZoomModule,
    CarouselModule,
    ReactiveFormsModule,
    FrontendRoutingModule
  ]
})
export class FrontendModule { }
