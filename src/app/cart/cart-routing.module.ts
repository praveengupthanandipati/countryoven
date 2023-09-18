import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { PersonalizeComponent } from './personalize/personalize.component';

const routes: Routes = [
  {path:'', component:CartComponent},
  {path:'Address-Cart', component:AddressComponent},
  {path:'Personalize', component:PersonalizeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
