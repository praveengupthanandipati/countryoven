import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-midheader',
  templateUrl: './midheader.component.html',
  styleUrls:['./midheader.component.scss']
})
export class MidheaderComponent  implements OnInit{
  @Input('searchList') searchList:any;
  isLogend:boolean=false;
  email:any;
  custID:any;
  custName:any;
  count:any;
  private subscription!: Subscription;
  constructor(private _curdService:CurdService)
  {
   if(localStorage.getItem('email'))
   {
    this.email=localStorage.getItem('email');
    this.custID=localStorage.getItem('customerId')
    this.custName=localStorage.getItem('custName')
   }



  }
  ngOnInit(): void {
      this.subscription = this._curdService.headerData$.subscribe((data) => {
      console.log(data)
      this.count=data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
