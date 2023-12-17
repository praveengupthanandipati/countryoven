
import { Component,  OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {


  custID:any;
  referalData:any;
  custName:any;
  constructor(    private _crud:CurdService, private route:Router)
  {

   if(localStorage.getItem('email'))
   {
    
   
    this.custID=localStorage.getItem('customerId');
    this.custName=localStorage.getItem('custName')
    
   }
  }
  ngOnInit(): void {
   this.getReferralCode()
  }

  getReferralCode()
{
  

  let data = {
    "CustomerId": this.custID
  }
  this._crud.getReferralCode(data).subscribe(res => {
    console.log(res)
    this.referalData=res;
   
   
  });
}


}
