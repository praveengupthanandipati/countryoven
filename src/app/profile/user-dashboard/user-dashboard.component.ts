import { Component } from '@angular/core';

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

  constructor()
  {
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
      LinkName:'Change your Password'
    },
    {
      Link:'/myaccount/cowallet',
      Icon:'icon-coupon',
      Title:'Co Wallet',
      LinkName:'Used / Unused Gift Vouchers'
    },
    {
      Link:'/myaccount/referral',
      Icon:'icon-coupon',
      Title:'Referral',
      LinkName:'User Referral Program'
    },
    
  ]
}
