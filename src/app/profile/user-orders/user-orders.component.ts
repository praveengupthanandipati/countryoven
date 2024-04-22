import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
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
  reviewForm:any;
  maxRating:any=5;
  highlightedStars:any;
  stars: number[] = [];
  currentRating: number = 0;
  reviewRate:any =0;
  websitereviewRate:any=0;
  serviceReviewRate:any=0;
  webstars: number[] = [];
  webhighlightedStars:any;
  servicestars: number[] = [];
  servicehighlightedStars:any;
  getOrderId:any;
  
  @ViewChild('closeButton')
  closeButton!: ElementRef;

  
  @ViewChild('trackcloseButton')
  trackcloseButton!: ElementRef;

  
  constructor( private titleService:Title, private meta:Meta,    private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private route:Router)
  {
    this.titleService.setTitle("Countryoven's - My Orders");
    this.meta.updateTag({ name: 'description',  content: "Countryoven's - My Orders" });
    this.meta.updateTag({ name: 'keywords',  content: "Countryoven's - My Orders" });
    this.meta.updateTag({ name: 'classification',  content:"Countryoven's - My Orders" });

    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      review:['', Validators.required],
      email: [''],
      reviewRate:[''],
      websiteReview:[''],
      serviceReview:['']
    });


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
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
    this.highlightedStars = Array(this.maxRating).fill(false);



    this.webstars = Array(5).fill(0).map((_, i) => i + 1);
    this.webhighlightedStars = Array(5).fill(false);

    this.servicestars = Array(5).fill(0).map((_, i) => i + 1);
    this.servicehighlightedStars = Array(5).fill(false);
  }

  gotoorders(oid:any)
{
  // /myaccount/orderdetails/7668
  this.route.navigateByUrl('myaccount/orderdetails/' + oid)
}


  getMyOrders()
  {
    // this.custID="5012";
    let data={ "customerId": this.custID}
    this._crud.getMyOrders(data).subscribe(res => {
      
      this.orderDetails=res;
    });
  }


  trackClick(e:any)
  {
 

  let data = {
    "customerId": this.custID,
    "OrderId":e
  }
  this._crud.track(data).subscribe(res => {
    if (!res.isEroor) {
      this.toastr.success(res.successMessage)
      // const button: HTMLButtonElement = this.trackcloseButton.nativeElement;
      // button.click();
     

    }
    else {
      this.toastr.error(res.errorMessage)
    }
   
  });



  }


  reviewClick(e:any)
  {
this.getOrderId=e;
  }
  onaddreview()
  {
  
if(this.reviewRate !=0 && this.websitereviewRate !=0 && this.serviceReviewRate !=0)
  {

  

    let data = {
      "reviewsDetails": {
     "customerName": this.custName,
        "customerEmail": this.email,
        "orderID": this.getOrderId,
        "title": this.reviewForm.value['title'],
        "review": this.reviewForm.value['review'],
        "reviewDate": new Date(),
        "reviewRate": this.reviewRate,
        "websiteReview": this.websitereviewRate,
        "serviceReview": this.serviceReviewRate,
      }
    }
    this._crud.addReview(data).subscribe(res => {
      if (!res.isEroor) {
        this.toastr.success(res.successMessage)
        const button: HTMLButtonElement = this.closeButton.nativeElement;
        button.click();
       this.getMyOrders()

      }
      else {
        this.toastr.error(res.errorMessage)
      }
     
    });

  }

 


  }


  rate(rating: number): void {
    this.reviewRate=rating;
    this.highlightedStars = this.stars.map((_, i) => i + 1 <= rating);
  }
webRatingfn(r:any)
{
this.websitereviewRate=r;

this.webhighlightedStars=this.webstars.map((_, i) => i + 1 <= r);
}

serviceRatingfn(r:any)
{
this.serviceReviewRate=r;
this.servicehighlightedStars=this.servicestars.map((_, i) => i + 1 <= r);
}

}
