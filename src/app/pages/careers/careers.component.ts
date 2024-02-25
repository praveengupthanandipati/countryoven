import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent {

constructor(private meta: Meta, private title: Title)
{
  this.title.setTitle("Countryoven's - Careers");
  this.meta.updateTag({ name: 'description', content:"Countryoven's - Careers"});
      this.meta.updateTag({ name: 'keywords', content: "Countryoven's - Careers" });
}

}
