import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent {
  constructor(private titleService:Title, private meta:Meta)
  {
    this.titleService.setTitle('Country Oven - OurStores');
    this.meta.updateTag({ name: 'description',  content: 'Country Oven - OurStores' });
    this.meta.updateTag({ name: 'keywords',  content: 'Country Oven - OurStores' });
    this.meta.updateTag({ name: 'classification',  content: 'Country Oven - OurStores' });
  
  }
}
