import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-occasions',
  templateUrl: './fathers-day-gifts.component.html',
  styleUrls: ['./fathers-day-gifts.component.scss']
})
export class FathersDayGiftsComponent  {
  constructor(private titleService: Title, private meta: Meta)
  {
    this.titleService.setTitle('Father’s Day Gifts from Country Oven!');
    this.meta.updateTag({name: 'description', content: 'Celebrate the fatherly spirit with thoughtful gifts from Country Oven. Choose from personalized keepsakes, gourmet hampers, designer cakes, and more to make your dad feel special. Enjoy same-day and midnight delivery. Show your love with unique gifts that reflect his personality and interests. Make this Father’s Day unforgettable with Country Oven!' });
    this.meta.updateTag({ name: 'keywords', content: 'Father’s Day gift ideas, Best Father’s Day gifts, Unique gifts for dad, Personalized Father’s Day gifts, Father’s Day gift combo, Father’s Day presents, Online Father’s Day gifts, Special gifts for Father’s Day, Father’s Day gift hampers, Father’s Day gift delivery' });

  }
}

