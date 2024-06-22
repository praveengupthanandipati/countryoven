import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './mothers-day-cakes.component.html',
  styleUrls: ['./mothers-day-cakes.component.scss']
})
export class MothersDayCakesComponent  {
  constructor(private titleService: Title, private meta: Meta, private renderer: Renderer2)
  {
    this.titleService.setTitle('Order Special Mothers Day Cakes Online | Mothers Day Cakes to India');
    this.meta.updateTag({ name: 'description', content: 'Order cakes online from Country Oven to celebrate Mother’s Day and have them delivered across India the same day or at midnight. We offer a variety of cakes that are sure to delight every mom. Order Mother’s Day cakes online and surprise your mom!' });
    this.meta.updateTag({ name: 'keywords', content: 'Order Special Mother’s Day Cakes Online | Mother’s Day Cakes to India ' });
    
  }
  ngOnInit(): void {
    this.addCanonicalLink()
  }
  private addCanonicalLink() {


    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com/order/mothers-day-cakes-online';
    }
    else {

      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://www.countryoven.com/order/mothers-day-cakes-online'; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }


  }
}

