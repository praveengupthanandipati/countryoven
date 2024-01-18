import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartCount:number =0;
  PinNumber:number =500090;
  sessionId:any;
 city:any;
countryname:any;
currency:any;
cartItems:any=[];
userIp:any;
  addonproducts: any;
firstlistItem:any;
customerId:any=0;
  viewedProducts: any=[];
  cityName: string | null;
  coutryName: string | null;
  currencySelected: string | null;
outofdatemessage:boolean=false;
currencyClass:any;
deliveryDates_array:any;
  constructor(private renderer: Renderer2,private route:Router,  private toastr: ToastrService,private _crud:CurdService, private cookieService: CookieService){
    this.sessionId= this.cookieService.get('sessionID')
    this.city=localStorage.getItem('city')
this.countryname=localStorage.getItem('country');
this.currency=localStorage.getItem('currency');

this.currency = localStorage.getItem('currency');
console.log(this.currency)
if (this.currency == 'INR') {
  this.currencyClass = 'icon-inr'
}
else if (this.currency == 'USD') {
  this.currencyClass = 'icon-dollar-currency-symbol'
}



if(localStorage.getItem('customerId'))
{
  this.customerId=localStorage.getItem('customerId')
}
    this.getCarts();
    this.cityName = localStorage.getItem('city')
    this.coutryName = localStorage.getItem('country');
    this.currencySelected = localStorage.getItem('currency');

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
  ngOnInit(): void {
    
    this._crud.getIpAddress().subscribe((data: any) => {
      this.userIp = data.ip;
       
     });
     this.getViewedProducts();
     this.getbindDate()
  }



getbindDate()


  {
    let data={
      "cityName": this.city,
      "maxLeadTime": 0
      }
    
      this._crud.getBindDeliveryDates(data).subscribe(res => {
        
        console.log(res);
       this.deliveryDates_array=res
    
    
            });
}



getCarts()
{
let data={
    customerId: this.customerId,
    sessionId: this.sessionId,
    cityName: this.city,
    countryName: this.countryname,
    currencySelected: this.currency
  }

  this._crud.postShopingCart(data).subscribe(res => {
    
    this.cartItems=res;
    this.cartCount=res.length;

    this._crud.updateHeaderData(this.cartCount);

this.firstlistItem=this.cartItems[0];

this.outofdatemessage=this.cartItems.some((item: { outOfDateMessage: any; }) => item.outOfDateMessage);
// this.cartItems.each(function(e:any)
// {
//   console.log(e.outOfDateMessage)
// })


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
  
let data={
  "sno": sno,
  "Quantity":quntity
  }
this.addLoader();
  this._crud.updateQuantity(data).subscribe(res => {
  this.removeLoader();
    if(!res.isEroor)
    {
      
      this.getCarts();

    }
        });
}





DeleteCartItem(sno:any)
{

  Swal.fire({
    width:'350px',
 // imageUrl: '../../assets/images/tick.png',
  imageHeight: 80,
  text: 'Do you want to delete the item',  
  showCancelButton: true,
  confirmButtonText:'Okay'
}).then((result) => {
  if (result.isConfirmed) {
  
let data={
  "sno": sno
  }

  this._crud.deleteProduct(data).subscribe(res => {
    
    this.getCarts();
        });
  }
});


}




addLoader()
{
  this.renderer.addClass(document.body, 'bodyloader');
}
removeLoader()
{
  this.renderer.removeClass(document.body, 'bodyloader');
}

addOnProducts()
{
  
let data={
   customerId: this.customerId,
  sessionId: this.sessionId,
  cityName: this.city,
  countryName: this.countryname,
  currencySelected: this.currency
  }

  this._crud.postAddOn(data).subscribe(res => {
    
  this.addonproducts=res
        });
}



addOnProductsupdateCart(addOnProductId:any)
{
  
let data={
  "customerId": this.customerId,
  "sessionId": this.sessionId,
  "addOnProductId":addOnProductId,
  "cityName": this.city,
  "deliveryDate": this.firstlistItem.deliveryDate,
  "deliveryTime": this.firstlistItem.deliveryTiming
  }

  this._crud.addAddOn(data).subscribe(res => {
    
    if(res.isEroor)
    {
      
      this.toastr.error(res.errorMessage);
    }
    else
    {
      this.toastr.success(res.successMessage);
      this.getCarts();
    }
        });
}




/* checkout */



SaveOrderDetails(addOnProductId:any)
{
  
let data={
  
    "orderDetailsDto": {
      "walletAmount": 0,
      "isCustomGift": true,
      "cityName": this.city,
      "customerId": this.customerId,
      "addressId": 262699,
      "totalAmount": 2500,
      "deliveryDate": "2023-10-10T06:01:54.302Z",
      "couponCode": "",
      "discountAmount": 0,
      "country":this.countryname,
      "deliveryTime": "Sameday",
      "deliveryCharges": 0,
      "customerComments": "Please deliver before 4PM",
      "giftingCard": "",
      "sessionId": this.sessionId,
      "customerIPAddress":this.userIp
    }
  
  }

  this._crud.SaveOrderDetails(data).subscribe(res => {
    
  
        });
}


gotocheckout()
{
if(this.customerId)
{
  this.route.navigateByUrl('/checkout')
}
else
{
  this.route.navigateByUrl('/login?arg=ck')
}

}




  //getRelatedProducts
  getViewedProducts(): void {
    const data = {


      "productId": "",
      "cityName": this.cityName,
      "countryName": this.coutryName,
      "currencySelected": this.currencySelected,
      "sessionId": this.sessionId

    }
    this._crud.getViewedProducts(data).subscribe(res => {

      this.viewedProducts = res;
    })
  }



}
