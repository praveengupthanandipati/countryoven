import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './birthday-cakes.component.html',
  styleUrls: ['./birthday-cakes.component.scss']
})
export class BirthdayCakesComponent  {
  constructor(private titleService: Title, private meta: Meta, private renderer: Renderer2)
  {
    this.titleService.setTitle('Delicious Birthday Cakes for All Celebrations');
    this.meta.updateTag({ name: 'description', content: ' Order online to experience the convenience of delivery right at your doorstep and make you birthday memorable with our luscious birthday cakes!' });
    this.meta.updateTag({ name: 'keywords', content: 'Birthday cakes, custom birthday cakes, birthday cake designs, birthday cake ideas, kids birthday cakes, adult birthday cakes, birthday cake delivery, cake flavors, birthday cake decorations, personalized birthday cakes' });
  }
  ngOnInit(): void {
    this.addCanonicalLink()
  }
  private addCanonicalLink() {
    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com/birthday-cakes';
    }
    else {
      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://www.countryoven.com/birthday-cakes'; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }
  }
}

