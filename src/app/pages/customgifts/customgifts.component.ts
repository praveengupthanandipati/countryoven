import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customgifts',
  templateUrl: './customgifts.component.html',
  styleUrls: ['./customgifts.component.scss']
})
export class CustomgiftsComponent {
  customerId:any;
constructor( private route: Router)
{
  
  if (localStorage.getItem('customerId')) {
    this.customerId = localStorage.getItem('customerId')

    // if (this.customerId) {
    //   this.route.navigateByUrl('/checkout')
    // }
    // else {
    //   this.route.navigateByUrl('/login?arg=ck')
    // }

  } else
  {
    // localStorage.setItem('pagename','customgifts')
    this.route.navigateByUrl('/login?arg=cg')
  }
}
}
