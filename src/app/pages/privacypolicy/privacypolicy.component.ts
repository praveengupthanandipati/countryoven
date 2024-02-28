import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent {

  constructor(private titleService:Title, private meta:Meta)
  {
    this.titleService.setTitle('Country Oven -  PrivacyPolicy');
    this.meta.updateTag({ name: 'description',  content: 'Country Oven - PrivacyPolicy' });
    this.meta.updateTag({ name: 'keywords',  content: 'Country Oven - PrivacyPolicy' });
    this.meta.updateTag({ name: 'classification',  content: 'Country Oven - PrivacyPolicy' });
  
  }
}
