import { Component,  OnInit } from '@angular/core';

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
  constructor(    private _crud:CurdService, private route:Router)
  {

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
    console.log(res)
    this.coWalletAmount=res.coWalletAmount;
    this.cowalletdata=res.coWalletTrackingDetails;
   
   
  });
}


}
