import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-midheader',
  templateUrl: './midheader.component.html',
  styleUrls:['./midheader.component.scss']
})
export class MidheaderComponent  implements OnInit{
  @Input('searchList') searchList:any;
  isLogend:boolean=false;
  email:any;
  custID:any;
  custName:any;
  count:any;
  sessionId:any;
  city:any;
  countryname:any;
  currency:any;
  customerId:any=0;
  private subscription!: Subscription;
  selectedCurrency:any;
  currencydrop:any=['INR', 'USA'];
  searchkeyword:any;
  constructor(private route:Router,  private _curdService:CurdService,private cookieService: CookieService)
  {
   if(localStorage.getItem('email'))
   {
    this.email=localStorage.getItem('email');
    this.custID=localStorage.getItem('customerId')
    this.custName=localStorage.getItem('custName')
   }



   this.sessionId= this.cookieService.get('sessionID')
   this.city=localStorage.getItem('city')
this.countryname=localStorage.getItem('country');
this.currency=localStorage.getItem('currency');
if(localStorage.getItem('customerId'))
{
 this.customerId=localStorage.getItem('customerId')
}

  }
  onCurrecnySelected()
  {
    
    
    localStorage.setItem('currency', this.selectedCurrency)
    window.location.reload();
  }

  ngOnInit(): void {
      this.subscription = this._curdService.headerData$.subscribe((data) => {
      
      this.count=data;
    });
    this.getCarts();
    

    if(localStorage.getItem('currency'))
    {
      this.selectedCurrency=localStorage.getItem('currency')
    }
    else
    {
      
    }


  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




  getCarts()
  {
  let data={
      customerId: this.customerId,
      sessionId: this.sessionId,
      cityName: this.city,
      countryName: this.countryname,
      currencySelected: this.currency
    }
  
    this._curdService.postShopingCart(data).subscribe(res => {
      
     
      this.count=res.length;
  
          });
  }



  gotoroute()
  {
  
  let c=localStorage.getItem('city') ;
  
  this.route.navigateByUrl('/search_result'+  '/'+ this.searchkeyword + '/' + c)
  
   
  }
  selectLoc()
  {
    if(localStorage.getItem('city'))
{
 
}

  }
  logout()
  {
    console.log('ss')
    localStorage.removeItem('email');
    localStorage.removeItem('custName');
    localStorage.removeItem('customerId');
    localStorage.removeItem('email');
    this.route.navigateByUrl('/')
    window.location.reload();
  }
}
