import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CurdService } from 'src/app/services/curd.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartCount:number =4;
  PinNumber:number =500090;
  sessionId:any;
 city:any;
countryname:any;
currency:any;
cartItems:any;
  addonproducts: any;
  constructor(private _crud:CurdService, private cookieService: CookieService){
    this.sessionId= this.cookieService.get('sessionID')
    this.city=localStorage.getItem('city')
this.countryname=localStorage.getItem('country');
this.currency=localStorage.getItem('currency');
    this.getCarts();


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







getCarts()
{
let data={
     customerId: 0,
    sessionId: this.sessionId,
    cityName: this.city,
    countryName: this.countryname,
    currencySelected: this.currency
  }

  this._crud.postShopingCart(data).subscribe(res => {
    console.log(res)
    this.cartItems=res.cartDto;

        });
}


incrementQuantity(index: number) {
  this.cartItems[index].quantity++;
}

decrementQuantity(index: number) {
  if (this.cartItems[index].quantity > 0) {
    this.cartItems[index].quantity--;
  }
}




updateCartItem(sno:any, quntity:any)
{
  console.log(quntity)
let data={
  "sno": sno,
  "Quantity":quntity
  }

  this._crud.updateQuantity(data).subscribe(res => {
    console.log(res)
  
        });
}


DeleteCartItem(sno:any)
{
let data={
  "sno": sno
  }

  this._crud.deleteProduct(data).subscribe(res => {
    console.log(res)
    this.getCarts();
        });
}





addOnProducts()
{
  
let data={
   customerId: 0,
  sessionId: this.sessionId,
  cityName: this.city,
  countryName: this.countryname,
  currencySelected: this.currency
  }

  this._crud.postAddOn(data).subscribe(res => {
    console.log(res)
  this.addonproducts=res
        });
}



}
