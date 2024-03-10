import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  custID:any;
allNotifications:any;
constructor( private toastr: ToastrService, private _crud:CurdService, private route:Router)
{
  
  if(localStorage.getItem('email'))
  {
   
 
   this.custID=localStorage.getItem('customerId')
   
  }

}
  ngOnInit(): void {
    this.getNotifications()
  }



getNotifications()
{
 
  let data={ "CustomerId": this.custID}
  this._crud.getNotification(data).subscribe(res => {
   
   this.allNotifications=res;
  });



}

}
