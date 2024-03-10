import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {
  email: any;
  custID: any;
  custName: any;
  sessionId:any;
  constructor(private _curdService: CurdService, private cookieService: CookieService,private route:Router)
  {
    if(localStorage.getItem('email'))
   {
    this.email=localStorage.getItem('email');
    this.custID=localStorage.getItem('customerId')
    this.custName=localStorage.getItem('custName')
   }
   this.sessionId= this.cookieService.get('sessionID')
  }
  userLinks:any[] =[
    {
      navLink:'/myaccount/dashboard',
      navLabel:'Dashboard'
    },
    {
      navLink:'/myaccount/my_profile',
      navLabel:'My Profile'
    },
    {
      navLink:'/myaccount/orders',
      navLabel:'My Orders'
    },    
    {
      navLink:'/myaccount/user-address',
      navLabel:'Address'
    },
    {
      navLink:'/myaccount/user-change-password',
      navLabel:'Change Password'
    },
    {
      navLink:'/myaccount/cowallet',
      navLabel:'Co Wallet'
    },
    {
      navLink:'/myaccount/referral',
      navLabel:'Referral'
    },
   
  ]


  logout()
  {
    
    localStorage.removeItem('email');
    localStorage.removeItem('custName');
    localStorage.removeItem('customerId');
    localStorage.removeItem('email');
    
    let data={
   
    
    
      "customerId": this.custID,
      "SessionId":this.sessionId
   
   
    }
    this._curdService.logout(data).subscribe(res => {
      
      this.route.navigateByUrl('/')
    });
    
    
  }

}
