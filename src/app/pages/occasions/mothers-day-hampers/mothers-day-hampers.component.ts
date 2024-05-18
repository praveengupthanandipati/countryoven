import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './mothers-day-hampers.component.html',
  styleUrls: ['./mothers-day-hampers.component.scss']
})

export class MothersDayHampersComponent  {
  constructor(private titleService: Title, private meta: Meta) {
    this.titleService.setTitle('Order Special Mothers Day Hampers Online | Mothers Day Hampers to India ');
    this.meta.updateTag({name: 'description', content: 'Order Mothers Day Hampers online from Country Oven and have them delivered across India the same day and midnight.Our hampers are filled with sweet treats, thoughtful gifts, and beautiful flowers, perfect for showing your love for your mom.Order Mother’s Day hampers online and surprise your mom!' });
    this.meta.updateTag({ name: 'keywords', content: 'Order Special Mothers Day Hampers Online | Mothers Day Hampers to India' });

  }
  
}

