import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {
orderId: any;
transId:any;
constructor( private _crud: CurdService, private route:Router)
{
 if(localStorage.getItem('orderId'))
 {

  this.orderId= localStorage.getItem('orderId')
  this.transId= localStorage.getItem('transcationId')
  this.PaymentConfirmation();
  localStorage.removeItem('orderId')
  localStorage.removeItem('transcationId')
 }
 else
 {
  this.route.navigateByUrl('/')
 }
}

PaymentConfirmation()
{
  let data = {
    "invoiceId": this.orderId,
    "transactionId": this.transId,
    "cashbackDiscountAmount": 0
  }
  this._crud.PaymentConfirmation(data).subscribe(res => {
  
   console.log(res)
  });
}


gotoorders()
{
  // /myaccount/orderdetails/7668
  this.route.navigateByUrl('myaccount/orderdetails/' + this.orderId)
}

}
