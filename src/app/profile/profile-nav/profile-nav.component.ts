import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {
  userLinks:any[] =[
    {
      navLink:'/myaccount',
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
      navLabel:'CoWallet'
    },
    {
      navLink:'/myaccount/referral',
      navLabel:'Referral'
    },
    {
      navLink:'/',
      navLabel:'Logout'
    },
  ]
}
