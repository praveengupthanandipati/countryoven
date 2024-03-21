import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, Meta } from '@angular/platform-browser';
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
analyticsCode: any;
analyticsCode1: any;
constructor(private sanitizer: DomSanitizer,private renderer: Renderer2, private _crud: CurdService, private route: ActivatedRoute, private router: Router, private meta: Meta)
{

}
ngOnInit() {
  this.route.queryParams.subscribe(params => {
  
  // this.PaymentConfirmation();

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
  
   if(res.isError)
   {
    this.router.navigateByUrl('failure')
   }
   else
   {
    this.analyticsCode=this.sanitizer.bypassSecurityTrustHtml(res.analyticsCode3);
    this.analyticsCode1=this.sanitizer.bypassSecurityTrustHtml(res.analyticsCode4);
   }
 
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
