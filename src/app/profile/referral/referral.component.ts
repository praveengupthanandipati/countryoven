
import { Component,  OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

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
  constructor( 
    private meta: Meta, private title: Title,
    private _crud:CurdService, private route:Router)
  {

    this.title.setTitle("Countryoven's - Referral Program");
    this.meta.updateTag({ name: 'description',  content: "Countryoven's - Referral Program" });
    this.meta.updateTag({ name: 'keywords',  content:"Countryoven's - Referral Program"  });
    this.meta.updateTag({ name: 'classification',  content: "Countryoven's - Referral Program"});
  
  

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
    
    this.referalData=res;
   
   
  });
}


}
