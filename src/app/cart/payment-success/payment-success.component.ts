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
scriptElement1: any;
analyticsCode: string="";
analyticsCode1: string="";
constructor(private renderer: Renderer2, private _crud: CurdService, private route: ActivatedRoute, private router: Router, private meta: Meta)
{

}
ngOnInit() {
  this.route.queryParams.subscribe(params => {
  

    let aa={
      "invoiceId": 992596,
      "transcationId": "82B73671CB7457221",
      "analyticsCode": " var gaJsHost = ((\"https:\" == document.location.protocol ) ? \"https://ssl.\" : \"http://www.\"); document.write(unescape(\"%3Cscript src='\" + gaJsHost + \"google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E\"));",
      "analyticsCode1": "try{  var pageTracker = _gat._getTracker('UA-61530761-1');  pageTracker._trackPageview();  pageTracker._addTrans('CO03102024195223647','Country Oven.in','4320.00','0.00','0.00','','3954','1'); pageTracker._addItem('CO03102024195223647','COFLO371','Eye Glazing Flower Arrangement','Olive Medium','2160.00','2');pageTracker._trackTrans(); } catch(err) {}",
      "payableAmountDollar": null,
      "isEroor": false,
      "errorMessage": null,
      "successMessage": null
  };
   
  // this.analyticsCode=aa.analyticsCode;
  //  this.analyticsCode1=aa.analyticsCode1;
  //  this.addAnalyticsCodeToHead();

//this.PaymentConfirmation();
if(localStorage.getItem('orderId') || params['InvoiceId'] !=undefined )
{

  this.orderId= localStorage.getItem('orderId') || params['InvoiceId'];
  this.transId= localStorage.getItem('transcationId') || params['TransactionId'];
  localStorage.removeItem('orderId')
  localStorage.removeItem('transcationId')
  this.PaymentConfirmation();
 



}
else
{
  
  this.reload=true;
  
}

  
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
  
   
   this.analyticsCode=res.analyticsCode;
   this.analyticsCode1=res.analyticsCode1;
   
   this.addAnalyticsCodeToHead();
  });
}


gotoorders()
{
  // /myaccount/orderdetails/7668
 this.router.navigateByUrl('myaccount/orderdetails/' + this.orderId)   
}

addAnalyticsCodeToHead() {

  this.scriptElement = this.renderer.createElement('script');
    this.scriptElement.type = 'text/javascript';
    this.scriptElement.innerHTML = this.analyticsCode;
  // this.renderer.appendChild(document.head, this.scriptElement);



    this.scriptElement1 = this.renderer.createElement('script');
    this.scriptElement1.type = 'text/javascript';
    this.scriptElement1.innerHTML = this.analyticsCode1;
    // this.renderer.appendChild(document.head, this.scriptElement1);

  
}


removeAnalyticsScript() {
  if (this.scriptElement) {
    this.renderer.removeChild(document.head, this.scriptElement);
  }
  if (this.scriptElement1) {
    this.renderer.removeChild(document.head, this.scriptElement1);
  }
}


ngOnDestroy(): void {
 // this.removeAnalyticsScript();
}
}
