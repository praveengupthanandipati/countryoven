import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input('iconicBanners') iconicBanners:any;
  categories=[
    {name: 'CAKES', image:'assets/images/categories/cakes.svg'},
    {name: 'FLOWERS', image:'assets/images/categories/flowers.svg'},
    {name: 'GIFTS', image:'assets/images/categories/gifts.svg'},
    {name: 'SAME DAY GIFTS', image:'assets/images/categories/samedaygifts.svg'},
    {name: 'BIRTHDAY GIFTS', image:'assets/images/categories/birthdaygifts.svg'},
    {name: 'COMBOS GIFTS', image:'assets/images/categories/combosgifts.svg'},
    {name: 'CAKES LOVED', image:'assets/images/categories/cakesloved.svg'},
    {name: 'ANNIVERSARY GIFTS', image:'assets/images/categories/anniversarygifts.svg'},
  ]
}
