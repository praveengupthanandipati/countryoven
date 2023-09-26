import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-banners',
  templateUrl: './category-banners.component.html',
  styleUrls: ['./category-banners.component.scss']
})
export class CategoryBannersComponent {
  @Input('smallBanners') smallBanners:any;

  constructor(){
    
  }
}
