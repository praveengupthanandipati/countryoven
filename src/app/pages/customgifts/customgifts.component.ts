import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-customgifts',
  templateUrl: './customgifts.component.html',
  styleUrls: ['./customgifts.component.scss']
})
export class CustomgiftsComponent {
  customerId:any;
  form: any;
  sessionId: any;
  city: any;
  countryname: any;
  currency: any;
  submitted: boolean=false;
constructor(private renderer: Renderer2, private route: Router, private _crud:CurdService, private fb: FormBuilder, private cookieService: CookieService)
{
  
  if (localStorage.getItem('customerId')) {
    this.customerId = localStorage.getItem('customerId')

    this.sessionId= this.cookieService.get('sessionID')
    this.city=localStorage.getItem('city')
 this.countryname=localStorage.getItem('country');
 this.currency=localStorage.getItem('currency');
    // if (this.customerId) {
    //   this.route.navigateByUrl('/checkout')
    // }
    // else {
    //   this.route.navigateByUrl('/login?arg=ck')
    // }

  } else
  {
    // localStorage.setItem('pagename','customgifts')
    this.route.navigateByUrl('/login?arg=cg')
  }

  this.form = this.fb.group({
    amount: ['', [Validators.required]],
    message: [''],
    
  });

}
addLoader() {
  this.renderer.addClass(document.body, 'bodyloader');
}
removeLoader() {
  this.renderer.removeClass(document.body, 'bodyloader');
}

submit(w:any)
{
  this.submitted=true
  if (this.form.valid) {
this.addLoader();
   

    let data = {
      "customProductData": {
        "customerId": this.customerId,
        "price":  this.form.get('amount')?.value,
        "cityName": this.city,
        "message":  this.form.get('message')?.value,
        "sessionID": this.sessionId,
        "currencySelected": this.currency,
        "countryName": this.countryname,
        "isCustomGift": true
      }

  }
  this._crud.postcustomGifts(data).subscribe(res => {
    this.removeLoader()
  
if(!res.isEroor)
{
this.route.navigateByUrl('/checkout')
}
   
  });

}

}
}
