import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() Productvalue: any;
  city: any;
  currency: any;
  currencyClass: any;
  stock: any;
  isNewArriaval: any;
  isEggless: any;
  tagClass: any;
  tagMsg: any;

  constructor() {

  }
  ngOnInit(): void {

    this.stock = this.Productvalue.stockTagMessage;
    this.isNewArriaval = this.Productvalue.newTagMessage;
    this.isEggless = this.Productvalue.egglessTagMessage;

    if (this.stock != '') {
      this.tagMsg = this.stock;
      if (this.stock == 'Out of Stock') {
        this.tagClass = 'errorcls'
      } 
      else  if (this.stock == 'Few Stock') {
        this.tagClass = 'bluecls'
      } 
      else  if (this.stock == 'Avaliable') {
        this.tagClass = ''
        this.tagMsg = '';
if(this.isEggless)
{
  this.tagClass = 'greencls'
      this.tagMsg = this.isEggless
}

      } 
      else {
        this.tagClass = 'greencls'
      }

    } else if (this.isNewArriaval) {
      this.tagClass = 'bluecls'
      this.tagMsg = this.isNewArriaval
    }
    else if (this.isEggless) {
      this.tagClass = 'greencls'
      this.tagMsg = this.isEggless
    }


    this.currency = localStorage.getItem('currency');
    if (this.currency == 'INR') {
      this.currencyClass = 'icon-inr'
    }
    else if (this.currency == 'USD') {
      this.currencyClass = 'icon-dollar-currency-symbol'
    }

    this.city = localStorage.getItem('city')?.toLowerCase();
    
  }

}
