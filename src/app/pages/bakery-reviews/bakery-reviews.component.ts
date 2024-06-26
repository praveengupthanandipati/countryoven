import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-bakery-reviews',
  templateUrl: './bakery-reviews.component.html',
  styleUrls: ['./bakery-reviews.component.scss']
})
export class BakeryReviewsComponent {
  productStar: number[] = [];
  maxRating: any = 5;
  productReviewRate: any = 0;
  productHighlightedStars: any = 0;
  foodHighlightedStars: any = 0;
  ServiceWebstars: number[] = [];
  ServiceWebhighlightedStars: any;
  ServiceReviewRate: any = 0;
  reviewForm: any;
  foodStar: number[] = [];
  foodReviewRate: number = 0;
  ambiencestars: number[] = [];
  ambiencehlightedStars: any;
  ambienceReviewRate: number = 0;
  buttonAction: boolean = false;
  constructor(private route1: ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder, private _crud: CurdService, private route: Router) {
    this.reviewForm = this.fb.group({
      customer: ['', Validators.required],
      review: [''],
      orderType: ['', Validators.required],
      oulet: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      email: ['', Validators.email],
    });
  }
  ngOnInit(): void {
    this.productStar = Array(this.maxRating).fill(0).map((_, i) => i + 1);
    this.productHighlightedStars = Array(this.maxRating).fill(false);

    this.ServiceWebstars = Array(5).fill(0).map((_, i) => i + 1);
    this.ServiceWebhighlightedStars = Array(5).fill(false);

    this.foodStar = Array(this.maxRating).fill(0).map((_, i) => i + 1);
    this.foodHighlightedStars = Array(this.maxRating).fill(false);

    this.ambiencestars = Array(5).fill(0).map((_, i) => i + 1);
    this.ambiencehlightedStars = Array(5).fill(false);
  }
  rate(rating: number): void {
    this.productReviewRate = rating;
    this.productHighlightedStars = this.productStar.map((_, i) => i + 1 <= rating);
    this.buttonValidation('ptodiuct', '');
  }
  food(rating: number): void {
    this.foodReviewRate = rating;
    this.foodHighlightedStars = this.foodStar.map((_, i) => i + 1 <= rating);
    this.buttonValidation('food', '');
  }
  ambience(rating: number): void {
    this.ambienceReviewRate = rating;
    this.ambiencehlightedStars = this.foodStar.map((_, i) => i + 1 <= rating);
    this.buttonValidation('amience', '');
  }
  webRatingfn(r: any) {
    this.ServiceReviewRate = r;
    this.ServiceWebhighlightedStars = this.ServiceWebstars.map((_, i) => i + 1 <= r);
    this.buttonValidation('service', '');
  }
  buttonValidation(event: any, name: any) {
    if (this.ambienceReviewRate > 0 && this.foodReviewRate > 0
      && this.productReviewRate > 0 && this.ServiceReviewRate > 0
      && this.reviewForm.valid) {
      this.buttonAction = true;
    }

  }
  onaddreview() {
    if (this.ambienceReviewRate > 0 && this.foodReviewRate > 0
      && this.productReviewRate > 0 && this.ServiceReviewRate > 0
      && this.reviewForm.valid) {
      const payload = {
        "reviewsDetails": {
          "customerName": this.reviewForm.controls.customer.value,
          "mobileNumber": this.reviewForm.controls.mobileNumber.value.toString(),
          "email": this.reviewForm.controls.email.value,
          "comments": this.reviewForm.controls.review.value,
          "reviewDate": new Date(),
          "status": true,
          "orderType": this.reviewForm.controls.orderType.value,
          "outlet": this.reviewForm.controls.oulet.value,
          "productRating": this.productReviewRate,
          "serviceRating": this.ServiceReviewRate,
          "foodTasteRating": this.foodReviewRate,
          "ambienceRating": this.ambienceReviewRate
        }
      }
      this._crud.addRating1(payload).subscribe(res => {
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
    this.ambiencehlightedStars = 0;
    this.foodHighlightedStars = 0;
    this.ServiceWebhighlightedStars = 0;
    this.productHighlightedStars = 0;
    this.buttonAction = false;
  }
}

