import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.component.html',
  styleUrls: ['./customer-services.component.scss']
})
export class CustomerServicesComponent {

  constructor(private meta: Meta, private title: Title)
  {
    this.title.setTitle("Countryoven's - Support");
    this.meta.updateTag({ name: 'description', content:"Countryoven's - Support"});
        this.meta.updateTag({ name: 'keywords', content: "Countryoven's - Support" });
  }
}
