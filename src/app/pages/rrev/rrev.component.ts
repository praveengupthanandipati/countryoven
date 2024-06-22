import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-rrev',
  templateUrl: './rrev.component.html',
  styleUrls: ['./rrev.component.scss']
})

export class RrevComponent {
  productStar: number[] = [];
  maxRating: any = 5;
  productReviewRate: any = 0;
  productHighlightedStars: any = 0;
  ServiceWebstars: number[] = [];
  ServiceWebhighlightedStars: any;
  ServiceReviewRate: any = 0;
  reviewForm: any;
  constructor(private titleService: Title, private meta: Meta, private toastr: ToastrService, private fb: FormBuilder, private _crud: CurdService, private route: Router) {
    this.reviewForm = this.fb.group({
      caption: ['', Validators.required],
      review: ['', Validators.required],
      refer: ['', Validators.required],
      recipient: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.productStar = Array(this.maxRating).fill(0).map((_, i) => i + 1);
    this.productHighlightedStars = Array(this.maxRating).fill(false);
    this.ServiceWebstars = Array(5).fill(0).map((_, i) => i + 1);
    this.ServiceWebhighlightedStars = Array(5).fill(false);

  }
  rate(rating: number): void {
    this.productReviewRate = rating;
    this.productHighlightedStars = this.productStar.map((_, i) => i + 1 <= rating);
  }
  webRatingfn(r: any) {
    this.ServiceReviewRate = r;
    this.ServiceWebhighlightedStars = this.ServiceWebstars.map((_, i) => i + 1 <= r);
  }
  onaddreview() {
    if (this.ServiceReviewRate != 0 && this.productReviewRate != 0) {

      const payload = {
        "reviewsDetails": {
          "recipientName": this.reviewForm.controls.recipient.value,
          "recipientEmail": this.reviewForm.controls.email.value,
          "orderID": "99450",
          "title": this.reviewForm.controls.caption.value,
          "review": this.reviewForm.controls.review.value,
          "reviewDate": new Date(),
          "reviewRate": 5,
          "status": true,
          "websiteReview": this.productReviewRate,
          "serviceReview": this.ServiceReviewRate,
          "doYouReferOrBuy": this.reviewForm.controls.refer.value == 'false' ? false : true
        }
      }
      this._crud.addRating(payload).subscribe(res => {
        if (!res.isEroor) {
          this.toastr.success(res.successMessage);
          this.cancel();
        }
        else {
          this.toastr.error(res.errorMessage)
        }

      });
    }
  }
  cancel() {
    this.reviewForm.reset();
    this.productReviewRate = 0;
    this.ServiceReviewRate = 0;
    this.ServiceWebhighlightedStars = 0;
    this.productHighlightedStars = 0;
  }
}
