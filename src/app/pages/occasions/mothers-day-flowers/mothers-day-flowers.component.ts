import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-occasions',
  templateUrl: './mothers-day-flowers.component.html',
  styleUrls: ['./mothers-day-flowers.component.scss']
})

export class MothersDayFlowersComponent  {
  constructor(private titleService: Title, private meta: Meta, private renderer: Renderer2) {
    this.titleService.setTitle('Order Special Mothers Day Flowers Online | Mothers Day Flowers to India ');
    this.meta.updateTag({name: 'description', content: 'Order Mothers Day flowers online from Country Oven and have them delivered across India the same day or at midnight.We offer a variety of personalized bouquets and other unique gifting categories.Order Mother’s Day flowers online and surprise your mom!' });
    this.meta.updateTag({ name: 'keywords', content: 'Order Special Mothers Day Flowers Online | Mothers Day Flowers to India' });

  }
  ngOnInit(): void {
    this.addCanonicalLink()
  }
  private addCanonicalLink() {


    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com/order/mothers-day-flowers-online';
    }
    else {

      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://www.countryoven.com/order/mothers-day-flowers-online'; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }
  }
}

