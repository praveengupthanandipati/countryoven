import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {
  userLinks:any[] =[
    {
      navLink:'/Profile',
      navLabel:'Dashboard'
    },
    {
      navLink:'/My Profile',
      navLabel:'My Profile'
    },
    {
      navLink:'/Orders',
      navLabel:'My Orders'
    },    
    {
      navLink:'/User-Address',
      navLabel:'Address'
    },
    {
      navLink:'/My Profile',
      navLabel:'Change Password'
    },
    {
      navLink:'/My Profile',
      navLabel:'Vouchers'
    },
    {
      navLink:'/My Profile',
      navLabel:'Logout'
    },
  ]
}
