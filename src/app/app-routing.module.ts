import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { StoresComponent } from './pages/stores/stores.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginModule } from './login/login.module';
import { CouponpartnersComponent } from './pages/couponpartners/couponpartners.component';
import { FranchisesComponent } from './pages/franchises/franchises.component';
import { LoginFormComponent } from './login/login-form/login-form.component';



const routes: Routes = [
    // {path:'', component:HomeComponent},
    // {path:'products-list', component:ProductListComponent},
    // {path:'product-detail', component:ProductDetailComponent},
    // {path:'Aboutus', component:AboutusComponent},
    // {path:'Stores', component:StoresComponent},
    // {path: 'Reviews', component:ReviewsComponent},
    // {path: 'Contact', component:ContactComponent},  
    // {path: 'Coupon-Partners', component:CouponpartnersComponent},
    // {path: 'Franchises', component:FranchisesComponent},  
  {path:'', loadChildren:()=>import('./frontend/frontend.module').then(m=>m.FrontendModule)},  
  {path:'login', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},  
  {path:'cart', loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
