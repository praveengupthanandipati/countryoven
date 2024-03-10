import { Component,  OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Router } from '@angular/router';

import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-cowallet',
  templateUrl: './cowallet.component.html',
  styleUrls: ['./cowallet.component.scss']
})
export class CowalletComponent implements OnInit {


  custID:any;
  cowalletdata:any;
  custName:any;
  coWalletAmount:any;
  constructor( private titleService:Title, private meta:Meta,   private _crud:CurdService, private route:Router)
  {
    this.titleService.setTitle("Countryoven's - Wallet");
    this.meta.updateTag({ name: 'description',  content: "Countryoven's - Wallet" });
    this.meta.updateTag({ name: 'keywords',  content: "Countryoven's - Wallet" });
    this.meta.updateTag({ name: 'classification',  content:"Countryoven's - Wallet" });
  

   if(localStorage.getItem('email'))
   {
    
   
    this.custID=localStorage.getItem('customerId');
    this.custName=localStorage.getItem('custName')
    
   }
  }
  ngOnInit(): void {
   this.getcowallet()
  }

getcowallet()
{
  

  let data = {
    "customerId": this.custID,
    
  }
  this._crud.coWalletTracking(data).subscribe(res => {
    
    this.coWalletAmount=res.coWalletAmount;
    this.cowalletdata=res.coWalletTrackingDetails;
   
   
  });
}


}
