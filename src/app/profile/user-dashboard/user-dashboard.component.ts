import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  isLogend:boolean=false;
  email:any;
  custID:any;
  custName:any;
  sessionId:any;
  constructor(private cookieService: CookieService, private titleService:Title, private meta:Meta, private _curdService:CurdService, private route:Router)
  {

    this.titleService.setTitle("Countryoven's - My Account");
    this.meta.updateTag({ name: 'description',  content: "Countryoven's - My Account" });
    this.meta.updateTag({ name: 'keywords',  content: "Countryoven's - My Account" });
    this.meta.updateTag({ name: 'classification',  content:"Countryoven's - My Account" });
    this.sessionId= this.cookieService.get('sessionID')
   if(localStorage.getItem('email'))
   {
    this.isLogend=true;
    this.email=localStorage.getItem('email');
    this.custID=localStorage.getItem('customerId')
    this.custName=localStorage.getItem('custName')
   }
  }
  userDbItems:any[] =[
    {
      Link:'/myaccount/my_profile',
      Icon:'icon-user',
      Title:'My Profile',
      LinkName:'View / Edit Profile'
    },
    {
      Link:'/myaccount/orders',
      Icon:'icon-gift-box',
      Title:'My Orders',
      LinkName:'Track Orders, Returns, Buy Thing Again'
    },
    // {
    //   Icon:'icon-circular-alarm-clock-tool',
    //   Title:'My Reminders',
    //   LinkName:'Add / Edit / Delete Reminder'
    // },
    {
      Link:'/myaccount/user-address',
      Icon:'icon-pin',
      Title:'My Address',
      LinkName:'Add / View / Edit Address'
    },
    {
      Link:'/myaccount/user-change-password',
      Icon:'icon-lock',
      Title:'Change Password',
      LinkName:'Change Your Password'
    },
    {
      Link:'/myaccount/cowallet',
      Icon:'icon-wallet',
      Title:'Co Wallet',
      LinkName:'Used / Unused Wallet History'
    },
    {
      Link:'/myaccount/referral',
      Icon:'icon-reference',
      Title:'Referral',
      LinkName:'User Referral Program'
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
