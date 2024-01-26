import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent {
constructor(private titleService:Title, private meta:Meta)
{
  this.titleService.setTitle('Country Oven - About us');
  this.meta.updateTag({ name: 'description',  content: 'Country Oven - About us' });
  this.meta.updateTag({ name: 'keywords',  content: 'Country Oven - About us' });
  this.meta.updateTag({ name: 'classification',  content: 'Country Oven - About us' });

}
}
