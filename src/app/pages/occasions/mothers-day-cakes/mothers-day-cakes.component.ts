import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './mothers-day-cakes.component.html',
  styleUrls: ['./mothers-day-cakes.component.scss']
})
export class MothersDayCakesComponent  {
  constructor(private titleService: Title, private meta: Meta)
  {
    this.titleService.setTitle('Order Special Mothers Day Cakes Online | Mothers Day Cakes to India');
    this.meta.updateTag({ name: 'description', content: 'Order cakes online from Country Oven to celebrate Mother’s Day and have them delivered across India the same day or at midnight. We offer a variety of cakes that are sure to delight every mom. Order Mother’s Day cakes online and surprise your mom!' });
    this.meta.updateTag({ name: 'keywords', content: 'Order Special Mother’s Day Cakes Online | Mother’s Day Cakes to India ' });

  }
}

