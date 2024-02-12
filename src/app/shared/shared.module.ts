import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { MainnavComponent } from '../components/header/mainnav/mainnav.component';
import { MidheaderComponent } from '../components/header/midheader/midheader.component';
import { TopheaderComponent } from '../components/header/topheader/topheader.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { SetLocComponent } from '../components/set-loc/set-loc.component';
import { DisplylocpopupComponent } from '../components/displylocpopup/displylocpopup.component';
import { AddressListComponent } from '../address-list/address-list.component';
import { Select2Module } from 'ng-select2-component';
import { ProductItemComponent } from '../components/product-item/product-item.component';
import { StickyRibbonComponent } from '../components/sticky-ribbon/sticky-ribbon.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    HeaderComponent ,
    TopheaderComponent,
    StickyRibbonComponent,
    MidheaderComponent,
    MainnavComponent,
    FooterComponent ,
    SetLocComponent,
    DisplylocpopupComponent,
    AddressListComponent,
    ProductItemComponent,
    
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Select2Module,
    ReactiveFormsModule,
    NgxPayPalModule,
    ToastrModule.forRoot({
      timeOut: 3000,
     positionClass: 'toast-bottom-center',
     preventDuplicates: true,
      progressBar: true,
    })    
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    HeaderComponent,
    StickyRibbonComponent,
    TopheaderComponent,
    MidheaderComponent,
    SetLocComponent,
    DisplylocpopupComponent,
    MainnavComponent,
    FooterComponent,
    AddressListComponent,
    ProductItemComponent ,
    NgxPayPalModule
    
   
  ],
  providers: [],
})
export class SharedModule {}
