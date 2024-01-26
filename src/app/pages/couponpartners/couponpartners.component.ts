import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-couponpartners',
  templateUrl: './couponpartners.component.html',
  styleUrls: ['./couponpartners.component.scss']
})
export class CouponpartnersComponent {
  constructor(private titleService:Title, private meta:Meta)
  {
    this.titleService.setTitle('Country Oven-CouponPartners');
    this.meta.updateTag({ name: 'description',  content: 'Country Oven-CouponPartners' });
    this.meta.updateTag({ name: 'keywords',  content: 'Country Oven-CouponPartners' });
    this.meta.updateTag({ name: 'classification',  content: 'Country Oven-CouponPartners' });
  
  }
}
