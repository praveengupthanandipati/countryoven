import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './fathers-day-hampers.component.html',
  styleUrls: ['./fathers-day-hampers.component.scss']
})
export class FathersDayHampersComponent  {
  constructor(private titleService: Title, private meta: Meta)
  {
    this.titleService.setTitle('Father’s Day Combos - Celebrate Your Superhero with Country Oven');
    this.meta.updateTag({ name: 'description', content: 'Show your dad how much he means to you with our delightful collection of cakes, flowers, and personalized gifts. Order Father’s Day combos online and enjoy same- day delivery anywhere in India.Make this Father’s Day unforgettable with Country Oven’s unique gift combos designed to express your love and appreciation.' });
    this.meta.updateTag({ name: 'keywords', content: 'Father’s Day gift combos, Father’s Day special gifts, Celebrate Father’s Day, Country Oven Father’s Day, Father’s Day delivery India, Order Father’s Day gifts online, Unique Father’s Day gifts, Personalized Father’s Day combos' });

  }
}

