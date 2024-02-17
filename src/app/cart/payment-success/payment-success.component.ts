import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
orderId: any;
transId:any;
reload:boolean=false;
constructor( private _crud: CurdService, private route: ActivatedRoute, private router: Router)
{
//  if(localStorage.getItem('orderId'))
//  {

//   this.orderId= localStorage.getItem('orderId')
//   this.transId= localStorage.getItem('transcationId')
//   this.PaymentConfirmation();
//   localStorage.removeItem('orderId')
//   localStorage.removeItem('transcationId')
//  }
//  else
//  {
//   //this.route.navigateByUrl('/')
//  }
}
ngOnInit() {
  this.route.queryParams.subscribe(params => {
    console.log(params['InvoiceId'])
if(localStorage.getItem('orderId') || params['InvoiceId'] !=undefined )
{

  this.orderId= localStorage.getItem('orderId') || params['InvoiceId'];
  this.transId= localStorage.getItem('transcationId') || params['TransactionId'];
  localStorage.removeItem('orderId')
  localStorage.removeItem('transcationId')
  this.PaymentConfirmation();
 


console.log('yes')
}
else
{
  console.log('no')
  this.reload=true;
  
}

    // const invoiceId = params['InvoiceId'];
    // const transactionId = params['TransactionId'];
    
    // Process the data as needed
    // console.log('InvoiceId:', invoiceId);
    // console.log('TransactionId:', transactionId);
   
    // Once data is processed, navigate to the same route without query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }).unsubscribe();

if(this.reload)
{
  this.router.navigateByUrl('/')
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
  this.router.navigateByUrl('myaccount/orderdetails/' + this.orderId)
}

}
