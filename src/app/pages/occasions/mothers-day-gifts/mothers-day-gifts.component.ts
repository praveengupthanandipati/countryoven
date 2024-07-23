import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-occasions',
  templateUrl: './mothers-day-gifts.component.html',
  styleUrls: ['./mothers-day-gifts.component.scss']
})

export class MothersDayGiftsComponent  {
  constructor(private titleService: Title, private meta: Meta, private renderer: Renderer2) {
    this.titleService.setTitle('Order Special Mothers Day Gifts Online | Mothers Day Gifts to India ');
    this.meta.updateTag({name: 'description', content: 'Order Mothers Day gifts online from Country Oven and have them delivered across India the same day and midnight.We offer a variety of personalized gifts, indulgent cakes, fresh flowers, and delightful gift hampers online.Order Mother’s Day gifts online and surprise your mom!' });
    this.meta.updateTag({ name: 'keywords', content: 'Order Special Mothers Day Gifts Online | Mothers Day Gifts to India ' });

  }
  ngOnInit(): void {
    this.addCanonicalLink()
  }
  private addCanonicalLink() {


    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com/order/mothers-day-gifts-online';
    }
    else {

      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://www.countryoven.com/order/mothers-day-gifts-online'; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }
  }
}

