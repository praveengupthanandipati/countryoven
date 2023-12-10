import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {


  isLogend:boolean=false;
  email:any;
  custID:any;
  custName:any;
  orderDetails:any;

  constructor(private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private route:Router)
  {
   if(localStorage.getItem('email'))
   {
    this.isLogend=true;
    this.email=localStorage.getItem('email');
    this.custID=localStorage.getItem('customerId')
    this.custName=localStorage.getItem('custName')
   }
  }
  ngOnInit(): void {
    this.getMyOrders();
  }




  getMyOrders()
  {
    // this.custID="5012";
    let data={ "customerId": this.custID}
    this._crud.getMyOrders(data).subscribe(res => {
      
      this.orderDetails=res;
    });
  }






}
