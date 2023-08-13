import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import Swiper from 'swiper';
import { TopheaderComponent } from './components/header/topheader/topheader.component';
import { MidheaderComponent } from './components/header/midheader/midheader.component';
import { MainnavComponent } from './components/header/mainnav/mainnav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TopheaderComponent,
    MidheaderComponent,
    MainnavComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
