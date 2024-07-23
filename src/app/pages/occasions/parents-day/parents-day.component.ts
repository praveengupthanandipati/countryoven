import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './parents-day.component.html',
  styleUrls: ['./parents-day.component.scss']
})
export class ParentsDayComponent  {
  constructor(private titleService: Title, private meta: Meta, private renderer: Renderer2)
  {
    this.titleService.setTitle('Order Parents Day Gifts Online | Country Oven');
    this.meta.updateTag({ name: 'description', content: ' Order Parent’s Day gifts at Country Oven From delicious cakes,fresh flowers,gift vouchers and custom-made gifts to offer your loving parent’s.Order now! assure delivery' });
    this.meta.updateTag({ name: 'keywords', content: 'Parents Day gifts, gifts for parents, Parents Day ideas, gift delivery, personalized gifts, Country Oven, gift baskets, special day gifts, Parents Day celebration, best gifts for parents' });
  }
  ngOnInit(): void {
    this.addCanonicalLink()
  }
  private addCanonicalLink() {
    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com/parents-day-gifts';
    }
    else {
      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://www.countryoven.com/parents-day-gifts'; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }
  }
}

