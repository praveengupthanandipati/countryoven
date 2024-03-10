import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss']
})
export class UserOrderDetailComponent implements OnInit {
custName: any;
  custID: any;
  orderId:any;
  order: any;
  customerdetails:any;
  receipentdetails:any;
  orderdetails:any;
  productdetails:any;
  orderstatusdetails:any;
  currency:any;
  currencyClass:any;
  orderstatus:any;
constructor(private route:ActivatedRoute,private _crud:CurdService, private router:Router)
{
  const queryParams = this.route.snapshot.queryParams;



  if(localStorage.getItem('email'))
  {
   
   this.custID=localStorage.getItem('customerId')
   this.custName=localStorage.getItem('custName')
  }
}
  ngOnInit() {
   
    this.currency=localStorage.getItem('currency');
    if(this.currency=='INR')
    {
      this.currencyClass='icon-inr'
    }
     else if(this.currency =='USA')
     {
      this.currencyClass='icon-dollar-currency-symbol'
     }


    this.route.paramMap.subscribe((params) => {
      this.orderId= params.get('id') ?? "";
   this.getTrackdetails();
    });
  
   
  }

getTrackdetails()
{
  

  let data = {
    "customerId": this.custID,
    "OrderId":this.orderId
  }
  this._crud.track(data).subscribe(res => {

    this.order=res
    this.customerdetails=this.order.trackOrderCustomerDto;
    this.receipentdetails=this.order.trackOrderRecipientDto;
    this.orderdetails=this.order.trackOrderOrderDto;
        this.productdetails=this.order.trackOrderProductDto;
        this.orderstatusdetails=this.order.trackOrderStatusDto;
    
   this.orderstatus=this.orderdetails.orderStatus;




    // if (!res.isEroor) {
    
    // }
    // else {
      
    // }
   
  });
}

}
