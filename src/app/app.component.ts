import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurdService } from './services/curd.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sessionId: any;
  country: any='USA';
  showpopup: boolean = false;
  email: any;

  custName: any;
  count: any;
  customerId: any = 0;
  onLoadNotifications: any;
  city: any;
  countryname: any='USA';
  currency: any;
  ngOnInit(): void {

    
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.customerId = localStorage.getItem('customerId')
      this.custName = localStorage.getItem('custName')
     
    }
    this.city = localStorage.getItem('city')
    this.countryname = localStorage.getItem('country');
    this.currency = localStorage.getItem('currency');
    if (this.cookieService.check('sessionID')) {
      this.sessionId= this.cookieService.get('sessionID')
    }
    else {

      this.sessionId = this.generateSessionId(24);
      this.cookieService.set('sessionID', this.sessionId)
    }

    window.scrollTo(0, 0);

    this._crud.getIpAddress().subscribe((data: any) => {
      let userIp = data.ip;

      this._crud.getCountryusingIp1(userIp).subscribe((data: any) => {

      
      if(data.country =='IN')
      {
        
        this.country='India'
      }
      else{
        
        this.country = data.country;
  
      }
        if (!localStorage.getItem('country')) {
          localStorage.setItem('country', this.country)
        }
        if (localStorage.getItem('country') == 'India' && !localStorage.getItem('currency')) {
          localStorage.setItem('currency', 'INR')
        }

console.log('krishna')
        this._crud.updateCurrencyData(localStorage.getItem('currency'));

      });
    });

   
    this.router.events.subscribe((evt) => {
   if (evt instanceof NavigationEnd) {
setTimeout(() => {
  if (localStorage.getItem('city')) {
    this.city=localStorage.getItem('city')
  this.getCarts();
  }
}, 1000);

        // this.onLoadNotifications = {
        //   "id": 1,
        //   "message": "",
        //   "isImage": true,
        //   "imagePath": "https://r6x6m2y8.stackpathcdn.com/img/C-image.jpg",
        //   "duration": 5
        // }

        // setTimeout(() => {
        //   if (localStorage.getItem('city')) {
        //     this.showpopupfn(this.onLoadNotifications)
        //   }
        // }, 2000);


        window.scrollTo(0, 0);

      }
    });
  

   

  }


  constructor(private route: ActivatedRoute, private _crud: CurdService, private cookieService: CookieService, private router: Router) {
    this.route.params.subscribe((params) => {
      
      
      if (params['favspl'] == 'sitemap.xml') {
        
        window.location.reload();
      }
    })

   

  }




  title = 'countryoven';



  generateSessionId(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }



  showpopupfn(res: any) {
    if (this.cookieService.check('popupid') && this.cookieService.get('popupid') == res.id) {


    } else {
      this.cookieService.set('popupid', res.id);
      setTimeout(() => {
        this.showpopup = true;
      }, 1000);

    }



  }

  closepopup() {
    this.showpopup = false;
  }





  getCarts() {
    let data = {
      customerId: this.customerId,
      sessionId: this.sessionId,
      cityName: this.city,
      countryName: this.countryname,
      currencySelected: this.currency
    }

    this._crud.headerShopingCart(data).subscribe(res => {
      this.onLoadNotifications = res.onLoadNotifications;
      if (this.onLoadNotifications!=null)
      this.showpopupfn(res.onLoadNotifications)
      

      this.count = res.cartItemsCount;
this._crud.updateHeaderData(this.count);
    });
  }
}


