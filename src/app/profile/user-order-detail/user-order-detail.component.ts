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
constructor(private route:ActivatedRoute,private _crud:CurdService, private router:Router)
{
  const queryParams = this.route.snapshot.queryParams;
  console.log(queryParams)



  if(localStorage.getItem('email'))
  {
   
   this.custID=localStorage.getItem('customerId')
   this.custName=localStorage.getItem('custName')
  }
}
  ngOnInit() {
   
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
    if (!res.isEroor) {
    
      // const button: HTMLButtonElement = this.trackcloseButton.nativeElement;
      // button.click();
     

    }
    else {
      
    }
   
  });
}

}
