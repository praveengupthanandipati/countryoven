import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sticky-ribbon',
  templateUrl: './sticky-ribbon.component.html',
  styleUrls: ['./sticky-ribbon.component.scss']
})
export class StickyRibbonComponent  implements OnInit  {

  
  @Input('count') count:number | undefined;
  showContactRibbon: boolean = false;
  ngOnInit() {
    // Check if the current route is the home page
    if (this.router.url === '/') {
      this.showContactRibbon = false;
    } else {
      this.showContactRibbon = true;
    }
  }

  constructor(private router: Router) {}

 toggleContactRibbon() {
  this.showContactRibbon = !this.showContactRibbon;
  localStorage.setItem('showContactRibbon', this.showContactRibbon ? 'true' : 'false');
} 


}
