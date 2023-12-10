import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() Productvalue:any;
  city:any;
  currency:any;
  currencyClass:any;
  constructor()
  {
   
  }
  ngOnInit(): void {
    this.currency=localStorage.getItem('currency');
    if(this.currency=='INR')
    {
      this.currencyClass='icon-inr'
    }
     else if(this.currency =='USA')
     {
      this.currencyClass='icon-dollar-currency-symbol'
     }
    
    this.city=localStorage.getItem('city')
  }
  
}
