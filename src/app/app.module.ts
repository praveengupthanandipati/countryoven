import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';

import { TopheaderComponent } from './components/header/topheader/topheader.component';
import { MidheaderComponent } from './components/header/midheader/midheader.component';
import { MainnavComponent } from './components/header/mainnav/mainnav.component';
import { CategoriesComponent } from './pages/home/categories/categories.component';
import { CategoryBannersComponent } from './pages/home/category-banners/category-banners.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TopheaderComponent,
    MidheaderComponent,
    MainnavComponent,
    CategoriesComponent,
    CategoryBannersComponent,     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
