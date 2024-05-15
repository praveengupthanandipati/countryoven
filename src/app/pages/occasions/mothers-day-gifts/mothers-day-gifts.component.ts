import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-occasions',
  templateUrl: './mothers-day-gifts.component.html',
  styleUrls: ['./mothers-day-gifts.component.scss']
})

export class MothersDayGiftsComponent  {
  constructor(private titleService: Title, private meta: Meta) {
    this.titleService.setTitle('Order Special Mothers Day Gifts Online | Mothers Day Gifts to India ');
    this.meta.updateTag({name: 'description', content: 'Order Mothers Day gifts online from Country Oven and have them delivered across India the same day and midnight.We offer a variety of personalized gifts, indulgent cakes, fresh flowers, and delightful gift hampers online.Order Mother’s Day gifts online and surprise your mom!' });
    this.meta.updateTag({ name: 'keywords', content: 'Order Special Mothers Day Gifts Online | Mothers Day Gifts to India ' });

  }
  
}

