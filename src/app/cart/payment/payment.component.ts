import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  implements OnInit{
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
constructor(private _crud:CurdService, private route: Router)
{
  console.log(this.amount);
  console.log(this.saveorderDetails)
}
  ngOnInit(): void {
    this.paidwalletamount=this.amount;
    this.displayamount=this.amount;
    this.currency = localStorage.getItem('currency');
    if (this.currency == 'INR') {
      this.currencyClass = 'icon-inr'
      this.walletamount=this.saveorderDetails.walletAmount;
    
    }
    else if (this.currency == 'USD') {
      this.currencyClass = 'icon-dollar-currency-symbol'
      this.walletamount=this.saveorderDetails.walletAmountUSD
     
    }
    console.log(this.amount)
  }

  onCheckboxChange(event: any)
  {
    this.iswalletCheck = event.target.checked;
    if (this.iswalletCheck) {
      // Checkbox is checked
      console.log('Checkbox is checked');
      
      if(this.walletamount >= this.amount)
      {
        this.showwalletbtn=true;
        this.paidwalletamount=this.walletamount -this.amount;
        this.displayamount=0;
      } else
      {
        this.showwalletbtn=false;
        this.paidwalletamount= this.amount - this.walletamount
        this.displayamount= this.amount - this.walletamount
      }


    } else {
      // Checkbox is unchecked

      this.paidwalletamount=this.amount;
      this.displayamount=this.amount;
      this.showwalletbtn=false

      console.log('Checkbox is unchecked');
    }
  }



  coWalletDetails() {
    
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
          console.log(res)
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
    



}

// "invoiceId": 974514,
//     "transcationId": "COWallet0207202420194428",
//     "analyticsCode": null,
//     "isEroor": false,
//     "errorMessage": null,
//     "successMessage": null