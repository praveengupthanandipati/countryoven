import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {
  userLinks:any[] =[
    {
      navLink:'/profile',
      navLabel:'Dashboard'
    },
    {
      navLink:'/my_profile',
      navLabel:'My Profile'
    },
    {
      navLink:'/orders',
      navLabel:'My Orders'
    },    
    {
      navLink:'/user-address',
      navLabel:'Address'
    },
    {
      navLink:'/user-change-password',
      navLabel:'Change Password'
    },
    {
      navLink:'/user-vouchers',
      navLabel:'Vouchers'
    },
    {
      navLink:'/',
      navLabel:'Logout'
    },
  ]
}
