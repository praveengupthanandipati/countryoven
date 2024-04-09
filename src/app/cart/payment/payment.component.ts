import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';
import {
  IPayPalConfig,
  ICreateOrderRequest ,
  
  NgxPaypalComponent
} from 'ngx-paypal';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  implements OnInit{
   public payPalConfig ? : IPayPalConfig;
  iswalletCheck: boolean = false;
  
@Input('amount') amount:any;
@Input('saveorderDetails') saveorderDetails:any;
currency:any;
currencyClass:any;
walletamount:any
totalAmount:any;
showwalletbtn:boolean=false;
paidwalletamount:any;
displayamount:any;
paypalClick:boolean=false;
payableAmountDollar:any;
country:any;
countryCls:any;
 paypalinvoice:any;
constructor(private _crud:CurdService, private route: Router, private renderer:Renderer2)
{


  // this.paypalConfig = {
  //   clientId: 'YOUR_PAYPAL_CLIENT_ID',
  //   currency: 'USD',
  // };

}
  ngOnInit(): void {
   //  this.initConfig();

    this.paidwalletamount=this.amount;
    this.displayamount=this.amount;
    this.currency = localStorage.getItem('currency');
    this.country=localStorage.getItem('country')
if(this.country='India')
{
  this.countryCls='india'
}
else
{
  this.countryCls='';
}
    if (this.currency == 'INR') {
      this.currencyClass = 'icon-inr'
      this.walletamount=this.saveorderDetails.walletAmount;
    
    }
    else if (this.currency == 'USD') {
      this.currencyClass = 'icon-dollar-currency-symbol'
      this.walletamount=this.saveorderDetails.walletAmountUSD
     
    }
    
    this.PaymentPaypal()
  }

  onCheckboxChange(event: any)
  {
    this.iswalletCheck = event.target.checked;
    if (this.iswalletCheck) {
      // Checkbox is checked
      
      
      if(this.walletamount >= this.amount)
      {
        this.showwalletbtn=true;
        this.paidwalletamount=this.walletamount -this.amount;
        this.displayamount=0;
      } else
      {
        this.showwalletbtn=false;
        this.paidwalletamount= this.amount - this.walletamount


        if (this.currency == 'USD')
        {
          
          this.displayamount= (this.amount - this.walletamount).toFixed(2);
        }
        else
        {
          this.displayamount= this.amount - this.walletamount
        }


        
      }


    } else {
      // Checkbox is unchecked

      this.paidwalletamount=this.amount;
      this.displayamount=this.amount;
      this.showwalletbtn=false

      
    }

this.PaymentPaypal()

  }


  addLoader() {
    this.renderer.addClass(document.body, 'bodyloader');
  }
  removeLoader() {
    this.renderer.removeClass(document.body, 'bodyloader');
  }

  coWalletDetails() {
    this.addLoader()
        let data = {
    
          "walletPaymentDto": {
            "invoiceId": this.saveorderDetails.invoiceId,
            "isWalletChecked": true,
            "payableAmount": this.amount,
            "walletAmount": this.walletamount,
            "Currencyselected":this.currency
          }
    
        }
    
        this._crud.postWallet(data).subscribe(res => {
          this.removeLoader()
    if(res.isEroor)
    {
this.route.navigateByUrl('failure')

//error page
    } else
    {
      localStorage.setItem('orderId', res.invoiceId);
      localStorage.setItem('transcationId', res.transcationId);
      
      this.route.navigateByUrl('payment-success')
//success page
    }

         
        });
      }
    



      PaymentPaypal() {
    
        let data = {
    
          "paypalPaymentDto": {
            "invoiceId": this.saveorderDetails.invoiceId,
            "isWalletChecked": this.iswalletCheck,
            "payableAmount": this.amount,
            "walletAmount": this.walletamount,
            "Currencyselected":this.currency
          }
    
        }
    
        this._crud.PaymentPaypal(data).subscribe(res => {
          
          this.paypalinvoice=res.invoiceId
          this.payableAmountDollar=res.payableAmountDollar
          this.paypalClick=true;
          this.initConfig()
//     if(res.isEroor)
//     {
// this.route.navigateByUrl('failure')


//     } else
//     {
//       localStorage.setItem('orderId', res.invoiceId);
//       localStorage.setItem('transcationId', res.transcationId);
//       this.route.navigateByUrl('payment-success')

//     }

         
        });
      }

     

  

    

      private initConfig(): void {


        this.payPalConfig = {
            currency: 'USD',

            clientId:'AVmjc8zNzEu5TRLcO-v5dfQuwEWTbc_l-fRbKlb5Htxh6mRd-5j6IcSr5KOM0C_rOETbyhOIxV0e40Ch', //live
//            clientId:'ARfPEwaZ0ZBbe_JPe8vSj8BnLZdXVPOKGwtGKTMNgeXJTG0_AuT3VQeB1j4Q3ih8uMRk1oFt2kAbDLKf',

           
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                  reference_id:this.saveorderDetails.invoiceId,
                    amount: {
                        currency_code: 'USD',
                        value: this.payableAmountDollar,
                       
                    },
                  
                }]
                
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
           
                actions.order.get().then((details: any) => {
                
              if(details.status="APPROVED")
              {
                localStorage.setItem('orderId', this.paypalinvoice);
                localStorage.setItem('transcationId', details.id);
                    this.route.navigateByUrl('payment-success')
              }
              else
              { 
                this.route.navigateByUrl('failure')
              }
                  });

            },
            onClientAuthorization: (data) => {
              
              //  this.showSuccess = true;
            },
            onCancel: (data, actions) => {
                
               // this.showCancel = true;

            },
            onError: err => {
                
              //  this.showError = true;
            },
            onClick: (data, actions) => {
             
               // this.resetStatus();
               
            }
            
        };
    }

/* payu code */
payupayment()
{
  let data = {
    
    "payUPaymentDto": {
      "invoiceId": this.saveorderDetails.invoiceId,
      "isWalletChecked": this.iswalletCheck,
      "payableAmount": this.amount,
      "walletAmount": this.walletamount,
      "Currencyselected":this.currency
    }

  }
  
  this._crud.payUBuy(data)
  .subscribe(arg => {
    
    const product = arg;
    // <input type="hidden" name="service_provider" value="${paymentDetails.service_provider}"/>
    const paymentDetails = {
      payu_url: "https://secure.payu.in/_payment",
      first_name: product.firstname, 
      email: product.email,
      mobile: product.phone, 
      callback_url: product.surl, 
      payu_cancel_url: product.furl, 
      payu_fail_url:product.furl, 
      payu_merchant_key: product.key, 
      payu_sha_token: product.hash, 
      txnid: product.txnid, 
      plan_name: product.productinfo, 
      amount: product.amount, 
      service_provider: product.service_provide
  };
  
  let paymentString = `
      <html>
        <body>
          <form action="${paymentDetails.payu_url}" method="post" id="payu_form">
            <input type="hidden" name="firstname" value="${paymentDetails.first_name}"/>
            <input type="hidden" name="email" value="${paymentDetails.email}"/>
            <input type="hidden" name="phone" value="${paymentDetails.mobile}"/>
            <input type="hidden" name="surl" value="${paymentDetails.callback_url}"/>
            <input type="hidden" name="curl" value="${paymentDetails.payu_cancel_url}"/>
            <input type="hidden" name="furl" value="${paymentDetails.payu_fail_url}"/>
            <input type="hidden" name="key" value="${paymentDetails.payu_merchant_key}"/>
            <input type="hidden" name="hash" value="${paymentDetails.payu_sha_token}"/>
            <input type="hidden" name="txnid" value="${paymentDetails.txnid}"/>
            <input type="hidden" name="productinfo" value="${paymentDetails.plan_name}"/>
            <input type="hidden" name="amount" value="${paymentDetails.amount}"/>
            <input type="hidden" name="service_provider" value="${paymentDetails.service_provider}"/>
            <button type="submit" value="submit" #submitBtn></button>
          </form>
          <script type="text/javascript">document.getElementById("payu_form").submit();</script>
        </body>
      </html>`;
  
  const winUrl = URL.createObjectURL(
      new Blob([paymentString], { type: "text/html" })
  );

window.location.href = winUrl; 


  });



}
   
}
