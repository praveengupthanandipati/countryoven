import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {path:'', component:CartComponent},
  {path:'personalize', component:PersonalizeComponent},
  {path:'payment', component:PaymentComponent},
  {path:'checkout', component:CheckoutComponent},  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
