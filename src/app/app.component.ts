import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  sessionId:any;
  ngOnInit(): void {

if(this.cookieService.check('sessionID'))
{
  
}
else
{
  
  this.sessionId = this.generateSessionId(24);
  this.cookieService.set('sessionID', this.sessionId)
}

  }


constructor(private cookieService: CookieService)
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


