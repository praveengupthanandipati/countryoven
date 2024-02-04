import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  cartCount: number = 0;
  custName: any;
  sessionId: any;
  city: any;
  countryname: any;
  currency: any;
  cartItems: any;
  userIp: any;
  addonproducts: any;
  firstlistItem: any;
  customerId: any = 0;
addressName:any;
addressCity:any;
addressId:any;
addressShow:boolean=true;
reviewShow:boolean=false;
paymentstrip:boolean=false;
couponForm:any;
totalAmount:any;
originalTotalAmount:any;
  errorcode: boolean=false;
  errorcodemessage: any;
  couponappled: boolean=false;
  
  
couponcode: any;
couponData:any;
  currencyClass: string='';
  savedorderdetails: any;


  constructor(private fb: FormBuilder,private route: Router, private toastr: ToastrService, private _crud: CurdService, private cookieService: CookieService) {
    this.sessionId = this.cookieService.get('sessionID')
    this.city = localStorage.getItem('city')
    this.countryname = localStorage.getItem('country');
    this.currency = localStorage.getItem('currency');
    this.custName = localStorage.getItem('custName');
    
    if (localStorage.getItem('customerId')) {
      this.customerId = localStorage.getItem('customerId')
    }


    
    console.log(this.currency)
    if (this.currency == 'INR') {
      this.currencyClass = 'icon-inr'
    }
    else if (this.currency == 'USD') {
      this.currencyClass = 'icon-dollar-currency-symbol'
    }



    this.getCarts();


    this.couponForm = this.fb.group({
      couponcode: ['', Validators.required],
      
      email: [''],
    
    });

  }
 
  ngOnInit(): void {
    this._crud.getIpAddress().subscribe((data: any) => {
      this.userIp = data.ip;
      
    });
  }
  getaddressId(e:any)
  {

this.addressShow=false
this.addressCity=e.cityName;
this.addressName=e.recipientFirstName + e.recipientLastName;
this.addressId=e.addressId;
this.reviewShow=true;
  }

  getCarts() {
    let data = {
      customerId: this.customerId,
      sessionId: this.sessionId,
      cityName: this.city,
      countryName: this.countryname,
      currencySelected: this.currency
    }

    this._crud.postShopingCart(data).subscribe(res => {
      console.log(res)
      this.cartItems = res;
      this.cartCount=res.length;
      this.firstlistItem = this.cartItems[0];
      this.originalTotalAmount=this.firstlistItem.grandTotal;
      this.totalAmount=this.firstlistItem.grandTotal;
      
    });
  }
  /* checkout */


  onSubmit() {
    this.couponcode=this.couponForm.value['couponcode'];
    let data = {
      couponCode:  this.couponForm.value['couponcode'],
      customerId: this.customerId,
      sessionId: this.sessionId,
      totalAmount:this.firstlistItem.grandTotal
    }
    this._crud.applyCoupon(data).subscribe(res => {
      
      this.couponData=res;
      if(res.isEroor)
      {
        this.errorcode=true;
        this.errorcodemessage=res.errorMessage;
        this.couponappled=false
      }
      else
      {
        if(res.couponType =='Instant')
        {
        this.totalAmount=this.originalTotalAmount - res.maxDiscount;
        
        }
        this.errorcode=false;
        this.couponappled=true
      }
      
    });
  }

  SaveOrderDetails() {
this.reviewShow=false;
    let data = {

      "orderDetailsDto": {
        "walletAmount": 0,
        "isCustomGift": true,
        "cityName": this.city,
        "customerId": this.customerId,
        "addressId": this.addressId,
        "totalAmount": this.totalAmount,
        "deliveryDate": this.firstlistItem.deliveryDate,
        "couponCode": this.couponcode,
        "discountAmount": 0,
        "country": this.countryname,
        "deliveryTime": this.firstlistItem.deliveryTiming,
        "deliveryCharges": 0,
        "customerComments": "Please deliver before 4PM",
        "giftingCard": "",
        "sessionId": this.sessionId,
        "customerIPAddress": this.userIp,
        "Currencyselected":this.currency
      }

    }

    this._crud.SaveOrderDetails(data).subscribe(res => {
      console.log(res)
this.paymentstrip=true;
      this.savedorderdetails=res
      // "orderId": "CG01282024205158596",
      // "invoiceId": 974471,
      // "walletAmount": 754,
      // "walletAmountUSD": 10.05,
      // "isEroor": false,
      // "errorMessage": null,
      // "successMessage": "Success"



// this.route.navigateByUrl('/orders')
    });
  }


}
