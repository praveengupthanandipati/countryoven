import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  constructor(private titleService:Title, private meta:Meta)
  {
    this.titleService.setTitle('Country Oven - Shipping & Deliver');
    this.meta.updateTag({ name: 'description',  content: 'Country Oven - Shipping & Deliver' });
    this.meta.updateTag({ name: 'keywords',  content: 'Country Oven - Shipping & Deliver' });
    this.meta.updateTag({ name: 'classification',  content: 'Country Oven - Shipping & Deliver' });
  
  }
}
