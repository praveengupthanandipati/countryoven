import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticky-ribbon',
  templateUrl: './sticky-ribbon.component.html',
  styleUrls: ['./sticky-ribbon.component.scss']
})
export class StickyRibbonComponent  implements OnInit  {
 
  @Input('count') count:number | undefined;
  showContactRibbon: boolean = false;
  ngOnInit() {
    
  }

 constructor(){} 

 toggleContactRibbon() {
  this.showContactRibbon = !this.showContactRibbon;
  localStorage.setItem('showContactRibbon', this.showContactRibbon ? 'true' : 'false');
} 


}
