import { Component } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {

  userOrders=[
    {
      Image:'assets/images/products/product01.jpg', 
      Name:'Precious Beauty Flowers', 
      Date:'July 20',
      Status:'Your item has been delivered',
      Price:1299,
    },
    {
      Image:'assets/images/products/product02.jpg', 
      Name:'Precious Beauty Flowers', 
      Date:'July 20',
      Status:'Your item has been delivered',
      Price:1299,
    },
    {
      Image:'assets/images/products/product03.jpg', 
      Name:'Precious Beauty Flowers', 
      Date:'July 20',
      Status:'Your item has been delivered',
      Price:1299,
    },
    {
      Image:'assets/images/products/product04.jpg', 
      Name:'Precious Beauty Flowers', 
      Date:'July 20',
      Status:'Your item has been delivered',
      Price:1299,
    },
    
  ]


}
