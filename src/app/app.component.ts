import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurdService } from './services/curd.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sessionId: any;
  country: any;
  showpopup:boolean=false;
  onLoadNotifications:any;
  ngOnInit(): void {

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   // Your code here, this will be called every time the route changes
    //   console.log("Route changed");
    // });




    window.scrollTo(0, 0);

    this._crud.getCountryusingIp().subscribe((data: any) => {

      console.log(data.country)
      this.country = data.country;

      if (!localStorage.getItem('country')) {
        localStorage.setItem('country', this.country)
      }
      if (localStorage.getItem('country') == 'India' && !localStorage.getItem('currency')) {
        localStorage.setItem('currency', 'INR')
      }



    });

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {


        this.onLoadNotifications=   {
          "id": 1,
          "message": "",
          "isImage": true,
          "imagePath": "https://r6x6m2y8.stackpathcdn.com/img/C-image.jpg",
          "duration": 5
      }
    
    setTimeout(() => {
      this.showpopupfn(this.onLoadNotifications)
    }, 2000);


        window.scrollTo(0, 0);

      }
    });
    if (this.cookieService.check('sessionID')) {

    }
    else {

      this.sessionId = this.generateSessionId(24);
      this.cookieService.set('sessionID', this.sessionId)
    }

  }


  constructor(private route: ActivatedRoute, private _crud: CurdService, private cookieService: CookieService, private router: Router) {
    this.route.params.subscribe((params) => {
      console.log(params)
      console.log(params['favspl'])
      if (params['favspl'] == 'sitemap.xml') {
        console.log('hi')
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



  showpopupfn(res:any)
  {
    if(this.cookieService.check('popupid') && this.cookieService.get('popupid') == res.id)
    {
      
    
    }  else
    {
      this.cookieService.set('popupid', res.id);
      setTimeout(() => {
        this.showpopup=true;
      }, 5000);
  
    }
  
  
  
  }
  
closepopup()
{
  this.showpopup=false;
}

}


