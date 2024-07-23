import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './fathers-day-flowers.component.html',
  styleUrls: ['./fathers-day-flowers.component.scss']
})
export class FathersDayFlowersComponent  {
  constructor(private titleService: Title, private meta: Meta, private renderer: Renderer2)
  {
    this.titleService.setTitle('Father’s Day Flowers: Show Your Love and Appreciation | Country Oven');
    this.meta.updateTag({ name: 'description', content: 'Celebrate Father’s Day in style with our exquisite collection of flower arrangements designed to honour and appreciate the remarkable dads in your life.With same- day delivery options available, make this day truly special by surprising your dad with a beautiful bouquet that symbolizes your heartfelt sentiments.' });
    this.meta.updateTag({ name: 'keywords', content: 'Father’s Day flowers, best flowers for dad, Father’s Day flower delivery, Father’s Day flower arrangements, Flowers for Father’s Day, Order flowers for dad, Fresh flowers for Father’s Day, Father’s Day bouquet, Online flower delivery for Father’s Day, Father’s Day floral gifts' });
  }
  ngOnInit(): void {
    this.addCanonicalLink()
  }
  private addCanonicalLink() {
    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com/order/fathers-day-flowers-online';
    }
    else {
      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://www.countryoven.com/order/fathers-day-flowers-online'; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }
  }
}

