import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() Productvalue:any;
  city:any;
  constructor()
  {
   
  }
  ngOnInit(): void {
    console.log(this.Productvalue)
    this.city=localStorage.getItem('city')
  }
  
}
