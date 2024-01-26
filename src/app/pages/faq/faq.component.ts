import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  constructor(private titleService:Title, private meta:Meta)
  {
    this.titleService.setTitle('Country Oven - FAQ');
    this.meta.updateTag({ name: 'description',  content: 'Country Oven - FAQ' });
    this.meta.updateTag({ name: 'keywords',  content: 'Country Oven - FAQ' });
    this.meta.updateTag({ name: 'classification',  content: 'Country Oven - FAQ' });
  
  }
}
