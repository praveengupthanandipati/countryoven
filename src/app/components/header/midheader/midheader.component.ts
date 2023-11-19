import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

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

  constructor()
  {
   if(localStorage.getItem('email'))
   {
    this.email=localStorage.getItem('email');
    this.custID=localStorage.getItem('customerId')
    this.custName=localStorage.getItem('custName')
   }



  }
  ngOnInit(): void {
  
  
  }
}
