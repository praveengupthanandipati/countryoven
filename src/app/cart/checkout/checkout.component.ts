import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartCount: number = 0;
  custName: any;
  sessionId: any;
  city: any;
  countryname: any;
  currency: any;
  cartItems: any;
  userIp: any = 'not captured';
  addonproducts: any;
  firstlistItem: any;
  customerId: any = 0;
  addressName: any;
  addressCity: any;
  addressId: any;
  addressShow: boolean = false;
  reviewShow: boolean = false;
  paymentstrip: boolean = false;
  couponForm: any;
  totalAmount: any;
  originalTotalAmount: any;
  errorcode: boolean = false;
  errorcodemessage: any;
  couponappled: boolean = false;
  finalamount: any;

  couponcode: any;
  couponData: any;
  currencyClass: string = '';
  savedorderdetails: any;
  appliedDiscount: any = 0;
  deliveryDates_array: any;
  displaydeliveryDate: any;
  displaydeliveryTime: any;
  deliveryTime: any;
  userForm: any;
  timeerror: boolean = false;
  currencySelected: any;
  isCustomGift: boolean = false;
  zipCode: any = 0;
  @ViewChild('closeButton')
  closeButton!: ElementRef;
  clickpayment: boolean = false;
  isReqired: boolean = true;
  isAddressReshow: boolean = true;
  isChanged: boolean = false;
  msg: string = '';
  cashbackMessage = '';
  prevzipcode: string = '';
  constructor(private renderer: Renderer2, private fb: FormBuilder, private route: Router, private toastr: ToastrService, private _crud: CurdService, private cookieService: CookieService) {
    this.sessionId = this.cookieService.get('sessionID')
    this.city = localStorage.getItem('city')
    this.countryname = localStorage.getItem('country');
    this.currency = localStorage.getItem('currency');
    this.currencySelected = localStorage.getItem('currency');
    this.custName = localStorage.getItem('custName');

    if (localStorage.getItem('customerId')) {
      this.customerId = localStorage.getItem('customerId')
    }

    this.userForm = this.fb.group({

      deliveryDate: ['', Validators.required],
      deliveryTime: ['', Validators.required],


    });


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
  getaddressId(event: any) {

    if (event.s) {
      this.addressShow = false
      this.addressCity = event.e.cityName;
      this.addressName = event.e.recipientFirstName + " " + event.e.recipientLastName;
      this.addressId = event.e.addressId;
      this.reviewShow = true;
      this.zipCode = event.e.zipCode;
      this.checkDeliveryTimes(this.zipCode)
    }
    else {
      this.reviewShow = false;
      this.paymentstrip = false;
      this.addressId = ''
    }

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

      if (res.length > 0) {
        this.cartItems = res;
        this.cartCount = res.length;
        this.firstlistItem = this.cartItems[0];

        this.displaydeliveryDate = this.firstlistItem.deliveryDate;
        this.displaydeliveryTime = this.firstlistItem.deliveryTiming;
        this.originalTotalAmount = this.firstlistItem.grandTotal;
        this.totalAmount = this.firstlistItem.grandTotal;
        this.finalamount = this.firstlistItem.grandTotal;
        this.isCustomGift = this.firstlistItem.isCustomGift;
        this.prevzipcode = this.firstlistItem.zipCode ? this.firstlistItem.zipCode : 'no'
        if (this.isAddressReshow)
          this.addressShow = true
      }
      else {
        this.route.navigateByUrl('/')
      }
    });
  }
  /* checkout */
  checkDeliveryTimes(zipcode: any) {

    let data = {
      "sessionId": this.sessionId,
      "cityName": this.city,
      "ZipCode": zipcode


    }
    this._crud.checkDeliveryTimes(data).subscribe(res => {

      this.isReqired = res.isReqired;
      this.isChanged = res.isChanged;
      this.msg = res.message
    })

  }

  onSubmit() {
    this.paymentstrip = false;
    this.couponcode = this.couponForm.value['couponcode'];
    let data = {
      couponCode: this.couponForm.value['couponcode'],
      customerId: this.customerId,
      sessionId: this.sessionId,
      totalAmount: this.firstlistItem.grandTotal,
      Currencyselected: this.currency
    }
    this._crud.applyCoupon(data).subscribe(res => {

      this.couponData = res;
      if (res.isEroor) {
        this.errorcode = true;
        this.errorcodemessage = res.errorMessage;
        this.couponappled = false
      }
      else {
        if (res.couponType == 'Instant') {
          if (this.currency == 'USD') {
            this.totalAmount = (this.originalTotalAmount - res.maxDiscount).toFixed(2);
          }
          else {
            this.totalAmount = (this.originalTotalAmount - res.maxDiscount);
          }

          this.finalamount = this.totalAmount;
          this.appliedDiscount = res.maxDiscount
        }
        this.cashbackMessage = res.cashbackMessage;
        this.errorcode = false;
        this.couponappled = true
      }

    });
  }
  removeApplycode() {


    Swal.fire({
      width: '350px',
      // imageUrl: '../../assets/images/tick.png',
      imageHeight: 80,
      text: 'Do you want to delete the Coupon',
      showCancelButton: true,
      confirmButtonText: 'Okay'
    }).then((result) => {
      if (result.isConfirmed) {

        this.couponForm.get('couponcode').setValue('');
        this.cashbackMessage = ''
        this.totalAmount = this.originalTotalAmount
        this.finalamount = this.totalAmount;
        this.appliedDiscount = 0
        this.couponappled = false


      }
    });






  }
  SaveOrderDetails() {
    this.addLoader();
    this.reviewShow = false;
    let data = {

      "orderDetailsDto": {
        "walletAmount": 0,
        "isCustomGift": false,
        "cityName": this.city,
        "customerId": this.customerId,
        "addressId": this.addressId,
        "totalAmount": this.totalAmount,
        "deliveryDate": this.firstlistItem.deliveryDate,
        "couponCode": this.couponcode,
        "discountAmount": this.appliedDiscount,
        "country": this.countryname,
        "deliveryTime": this.firstlistItem.deliveryTiming,
        "deliveryCharges": this.firstlistItem.deliveryCharges,
        "customerComments": "Please deliver before 4PM",
        "giftingCard": "",
        "sessionId": this.sessionId,
        "customerIPAddress": this.userIp,
        "Currencyselected": this.currency
      }

    }

    this._crud.SaveOrderDetails(data).subscribe(res => {

      this.clickpayment = true;

      this.paymentstrip = true;
      this.savedorderdetails = res
      // "orderId": "CG01282024205158596",
      // "invoiceId": 974471,
      // "walletAmount": 754,
      // "walletAmountUSD": 10.05,
      // "isEroor": false,
      // "errorMessage": null,
      // "successMessage": "Success"
      setTimeout(() => {
        this.removeLoader();
      }, 2000);


      // this.route.navigateByUrl('/orders')
    });
  }


  addLoader() {
    this.renderer.addClass(document.body, 'bodyloader');
  }
  removeLoader() {
    this.renderer.removeClass(document.body, 'bodyloader');
  }




  getbindDate() {
    let data = {
      "cityName": this.city,
      "maxLeadTime": this.firstlistItem.maxLeadTime
    }

    this._crud.getBindDeliveryDates(data).subscribe(res => {

      this.deliveryDates_array = res

      setTimeout(() => {

        this.userForm.get('deliveryDate')?.setValue(this.displaydeliveryDate);


        const data = {
          // "DeliveryDate": this.deliveryDates_array[0].deliveryDateValue,
          "DeliveryDate": this.displaydeliveryDate,
          "Leadtime": 0,
          "ZipCode": this.zipCode,
          "InstantDelivery": false,
          "cityName": this.city,
          "IsCustomGift": this.isCustomGift,
          "sessionId": this.cookieService.get('sessionID')
        }
        this._crud.getBindDeliveryTimes(data).subscribe(res => {

          this.deliveryTime = res.deliveryTimingsDtos;
          setTimeout(() => {

            // this.userForm.get('deliveryTime')?.setValue(this.displaydeliveryTime)
          }, 100);

        })
      }, 100);
    });
  }

  getBindDeliveryTimes(e: any) {
    const selectedValue = (e.target as HTMLSelectElement).value;

    const data = {
      "DeliveryDate": selectedValue,
      "Leadtime": 0,
      "ZipCode": this.zipCode,
      "InstantDelivery": false,
      "cityName": this.city,
      "IsCustomGift": this.isCustomGift,
      "sessionId": this.cookieService.get('sessionID')
    }
    this._crud.getBindDeliveryTimes(data).subscribe(res => {

      this.deliveryTime = res.deliveryTimingsDtos;

    })
  }


  updateDateandtime() {

    if (this.userForm.get('deliveryTime').value.toString() != "" && this.userForm.get('deliveryTime').value.toString() != 'Select Time') {
      this.timeerror = false;
      let data = {
        "sessionId": this.sessionId,
        "deliveryDate": this.userForm.get('deliveryDate').value,
        "deliveryTime": this.userForm.get('deliveryTime').value.toString(),
      }

      this._crud.updateDeliveryDateTime(data).subscribe(res => {
        if (!res.isEroor) {
          this.userForm.get('deliveryTime')?.setValue(this.displaydeliveryTime)
          this.isReqired = false;
          this.isAddressReshow = false;
          this.getCarts()
          const button: HTMLButtonElement = this.closeButton.nativeElement;
          button.click();
        }


      })
    }

    else {
      this.timeerror = true;
    }


  }

  openDatetime() {
    this.userForm.get('deliveryTime')?.setValue('')
    this.getbindDate();

  }


}
