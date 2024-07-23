import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './mothers-day-hampers.component.html',
  styleUrls: ['./mothers-day-hampers.component.scss']
})

export class MothersDayHampersComponent {
  constructor(private titleService: Title, private meta: Meta, private renderer: Renderer2) {
    this.titleService.setTitle('Order Special Mothers Day Hampers Online | Mothers Day Hampers to India ');
    this.meta.updateTag({ name: 'description', content: 'Order Mothers Day Hampers online from Country Oven and have them delivered across India the same day and midnight.Our hampers are filled with sweet treats, thoughtful gifts, and beautiful flowers, perfect for showing your love for your mom.Order Mother’s Day hampers online and surprise your mom!' });
    this.meta.updateTag({ name: 'keywords', content: 'Order Special Mothers Day Hampers Online | Mothers Day Hampers to India' });

  }
  ngOnInit(): void {
    this.addCanonicalLink()
  }
  private addCanonicalLink() {


    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com/order/mothers-day-hampers-online';
    }
    else {

      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://www.countryoven.com/order/mothers-day-hampers-online'; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }
  }
}


