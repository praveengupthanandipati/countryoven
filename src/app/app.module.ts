import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [
    AppComponent,
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartModule,
    LoginModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
