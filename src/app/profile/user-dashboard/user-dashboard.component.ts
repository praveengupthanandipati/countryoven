import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  userDbItems:any[] =[
    {
      Link:'/My Profile',
      Icon:'icon-user',
      Title:'My Profile',
      LinkName:'View / Edit Profile'
    },
    {
      Link:'/Orders',
      Icon:'icon-gift-box',
      Title:'My Orders',
      LinkName:'Track Orders, Returns, Buy Thing Again'
    },
    {
      Icon:'icon-circular-alarm-clock-tool',
      Title:'My Reminders',
      LinkName:'Add / Edit / Delete Reminder'
    },
    {
      Link:'/User-Address',
      Icon:'icon-pin',
      Title:'My Address',
      LinkName:'Add / View / Edit Address'
    },
    {
      Link:'/User-Change-Password',
      Icon:'icon-lock',
      Title:'Change Password',
      LinkName:'Change your Password'
    },
    {
      Link:'/User-Vouchers',
      Icon:'icon-coupon',
      Title:'Vouchers',
      LinkName:'Used / Unused Gift Vouchers'
    },
  ]
}
