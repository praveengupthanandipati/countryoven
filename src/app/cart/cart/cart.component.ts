import { Component } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartCount:number =4;
  PinNumber:number =500090;

  constructor(){
    function increaseValue():void {
      const inputElement = document.getElementById('number') as HTMLInputElement;
      let value: number = parseInt(inputElement.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      inputElement.value = value.toString();
    }
    function decreaseValue():void {
      const inputElement = document.getElementById('number') as HTMLInputElement;
      let value: number = parseInt(inputElement.value, 10);
      value = isNaN(value) ? 0 : value;
      value = value < 1 ? 1 : value;
      value--;
      inputElement.value = value.toString();
    }
  }  

  CartItems:any=[
    {
      Image: 'assets/images/products/product01.jpg', 
      Name: 'Precious Beauty',
      Offerprice:1299,
      Mrp:1500,
      Percentage:17,
      ShippingType:'Express'
    },
    {
      Image: 'assets/images/products/product02.jpg', 
      Name: 'Precious Beauty',
      Offerprice:1299,
      Mrp:1500,
      Percentage:17,
      ShippingType:'Express'
    },
    {
      Image: 'assets/images/products/product03.jpg', 
      Name: 'Precious Beauty',
      Offerprice:1299,
      Mrp:1500,
      Percentage:17,
      ShippingType:'Express'
    }
  ];   
}
