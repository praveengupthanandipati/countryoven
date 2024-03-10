import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit,OnDestroy {
orderId: any;
transId:any;
reload:boolean=false;
scriptElement: any;
analyticsCode: any = "<!-- Your analytics code here -->";
constructor(private renderer: Renderer2, private _crud: CurdService, private route: ActivatedRoute, private router: Router, private meta: Meta)
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

    // this.analyticsCode="<script type=\"text/javascript\">  var gaJsHost = ((\"https:\" == document.location.protocol ) ? \"https://ssl.\" : \"http://www.\"); document.write(unescape(\"%3Cscript src='\" + gaJsHost + \"google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E\")); </script><script type='text/javascript'>try{  var pageTracker = _gat._getTracker('UA-61530761-1');  pageTracker._trackPageview();  pageTracker._addTrans('CO03102024174729216','Country Oven.in','499.00','0.00','0.00','','3954','1'); pageTracker._addItem('CO03102024174729216','COCHO479','Assorted Macaron Hamper(6pcs)','Olive Medium','499.00','1');pageTracker._trackTrans(); } catch(err) {}</script>";
    // this.addAnalyticsCodeToHead();

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
  this.router.navigateByUrl('/')    // krishna
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
  
   console.log(res);
   this.analyticsCode=res.analyticsCode;
   this.addAnalyticsCodeToHead();
  });
}


gotoorders()
{
  // /myaccount/orderdetails/7668
  this.router.navigateByUrl('myaccount/orderdetails/' + this.orderId)   
}

addAnalyticsCodeToHead() {
  // const script = this.renderer.createElement('script');
  // script.type = 'text/javascript';
  // script.text = this.analyticsCode;
  this.scriptElement = this.renderer.createElement('script');
    this.scriptElement.type = 'text/javascript';
    this.scriptElement.innerHTML = this.analyticsCode;
    this.renderer.appendChild(document.head, this.scriptElement);
  
}


removeAnalyticsScript() {
  if (this.scriptElement) {
    this.renderer.removeChild(document.head, this.scriptElement);
  }
}


ngOnDestroy(): void {
  this.removeAnalyticsScript();
}
}
