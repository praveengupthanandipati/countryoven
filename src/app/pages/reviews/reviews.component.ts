import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
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


  
constructor(private titleService:Title, private meta:Meta, private toastr: ToastrService, private _crud:CurdService, private route:Router)
{
  
  this.titleService.setTitle('Reviews of Country Oven - Ratings Reviews');
  this.meta.updateTag({ name: 'description',  content: 'Country Oven - OurStoresCountry Oven Satisfy Customers in Hyderabad India!We prepare Best cakes,florists, gifts as per your Convenient Time.Customers give Good Reviews Rating.' });
  this.meta.updateTag({ name: 'keywords',  content: 'keywords" content="Countryoven Reviews, Countryoven Rating, Countryoven Ratings, Country Oven Reviews, Reviews' });
  this.meta.updateTag({ name: 'classification',  content: 'Country Oven Satisfy Customers in Hyderabad India!We prepare Best cakes,florists, gifts as per your Convenient Time.Customers give Good Reviews Rating.' });
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
   
   this.reviewData=res;
  });




}

}
