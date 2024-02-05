import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { CartheaderComponent } from './cartheader/cartheader.component';
import { AddressComponent } from './address/address.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';




@NgModule({
  declarations: [
    CartComponent,
    CartheaderComponent,
    AddressComponent,
    PersonalizeComponent,
    PaymentComponent,
    CheckoutComponent,
    PaymentSuccessComponent ,
     
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule   
  ]
})
export class CartModule { }
