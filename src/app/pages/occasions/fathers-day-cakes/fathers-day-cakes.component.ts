import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './fathers-day-cakes.component.html',
  styleUrls: ['./fathers-day-cakes.component.scss']
})
export class FathersDayCakesComponent  {
  constructor(private titleService: Title, private meta: Meta)
  {
    this.titleService.setTitle('Father’s Day Cakes from Country Oven: Celebrate Your Superhero Dad!');
    this.meta.updateTag({name: 'description', content: 'Celebrate the backbone of your family with a delectable Father’s Day cake from Country Oven.Choose from a variety of flavours like chocolate, vanilla, red velvet, and more, available in both egg and eggless variants.Enjoy same- day and midnight delivery to make your dad’s day unforgettable. Personalize your cake with heartfelt messages and exquisite designs tailored to his unique personality. Order now from Country Oven and make this Father’s Day truly special.' });
    this.meta.updateTag({ name: 'keywords', content: 'Father’s Day cakes, best cakes for Father’s Day, Father’s Day cake delivery, Personalized Father’s Day cakes, Order cakes for dad, Father’s Day cake ideas, Father’s Day cake combos, Chocolate cakes for Father’s Day, Fruit cakes for Father’s Day, Father’s Day cake designs' });

  }
}

