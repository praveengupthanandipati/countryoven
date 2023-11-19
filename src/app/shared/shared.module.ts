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

@NgModule({
  declarations: [
    HeaderComponent ,
    TopheaderComponent,
    MidheaderComponent,
    MainnavComponent,
    FooterComponent ,
    SetLocComponent,
    DisplylocpopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
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

    HeaderComponent,
    TopheaderComponent,
    MidheaderComponent,
    SetLocComponent,
    DisplylocpopupComponent,
    MainnavComponent,
    FooterComponent
   
  ],
  providers: [],
})
export class SharedModule {}
