import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  sessionId:any;
  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    localStorage.setItem('country', 'USA')
  this.router.events.subscribe((evt) => {
    if (evt instanceof NavigationEnd) {
    
        window.scrollTo(0, 0);
      
    }
  });
if(this.cookieService.check('sessionID'))
{
  
}
else
{
  
  this.sessionId = this.generateSessionId(24);
  this.cookieService.set('sessionID', this.sessionId)
}

  }


constructor(private cookieService: CookieService, private router: Router)
{

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
  
 
  
  

}


