import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  custID:any;
  reviewData: any;

constructor( private toastr: ToastrService, private _crud:CurdService, private route:Router)
{
  
  if(localStorage.getItem('email'))
  {
   
 
   this.custID=localStorage.getItem('customerId')
   
  }

}
  ngOnInit(): void {
    this.getReview()
  }



getReview()
{
 // this.custID="26368";
  let data={ "id": this.custID}
  this._crud.getReview(data).subscribe(res => {
   console.log(res) 
   this.reviewData=res;
  });




}

}
