import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { MainnavComponent } from '../components/header/mainnav/mainnav.component';
import { MidheaderComponent } from '../components/header/midheader/midheader.component';
import { TopheaderComponent } from '../components/header/topheader/topheader.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    HeaderComponent ,
    TopheaderComponent,
    MidheaderComponent,
    MainnavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 3000,
     positionClass: 'toast-bottom-center',
     preventDuplicates: true,
      progressBar: true,
    })    
  ],

  exports: [
    FormsModule,
    HeaderComponent,
    TopheaderComponent,
    MidheaderComponent,
    MainnavComponent,
    FooterComponent
   
  ],
  providers: [],
})
export class SharedModule {}
