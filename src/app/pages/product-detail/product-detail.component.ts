import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute,  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription,timer } from 'rxjs';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent  implements OnInit{
  
  productName:any;
  cityName:any;
  coutryName:any;
  currencySelected:any;
  sessionId:any;
  productId:any;
  isMultipleImages:boolean=false;
  productIamges:any;
  productDetails:any;
  reviewData:any;
  allProducts:any;
  dynamicForm: FormGroup;
  flavourOptionsDto_array:any;
  voucherOptionsDto_array:any;
  weightOptionsDto_array:any;
  numberOptionsDto_array:any;
  messageRequired:boolean=false;
  photoRequired:boolean=false;
  deliveryDates_array:any;
  leadTime:any;
  deliveryTime:any;
  isEggless:any;
  egglessPrice:number=0;
  productPrice:any;
  isegglessChecked:boolean=false;
  sNo:any;
  breadTitle: any;
  breadcatTitle: any;
  currency:any;
  currencyClass:any;

stockQuantityStatus:boolean=false;
isNewArriavalstatus:boolean=false;
egglessstatus:boolean=false;
tagMsg:any;
tagClass:any;

duration: string=''; // Input in the format "HH:mm:ss"
timeLeftInSeconds: number=0;
timerSubscription: Subscription = new Subscription;
displayTime:any;
textAreaInput = '';
isMaxLengthExceeded = false;
sameDayBlockMessage:any;
  selectedItem: any;
  selectedQty:any;
  constructor(
    private meta: Meta, private title:Title,
    private _crud:CurdService, private route:ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router:Router)
  {
    this.dynamicForm = this.fb.group({});
    this.cityName=localStorage.getItem('city')

this.coutryName=localStorage.getItem('country');
this.currencySelected=localStorage.getItem('currency');

  }


  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const currentLength = target.value.length;

    if (currentLength > 25) {
      // Truncate the value to 25 characters
      target.value = target.value.substring(0, 25);
      this.textAreaInput = target.value; // Update ngModel binding
      this.isMaxLengthExceeded = true;
    } else {
      this.isMaxLengthExceeded = false;
    }
  }

 displayTimer()
{
  this.timeLeftInSeconds = this.parseDuration(this.duration);

    this.timerSubscription = timer(0, 1000).subscribe(() => {
      if (this.timeLeftInSeconds > 0) {
        this.timeLeftInSeconds--;
        this.updateDisplayTime();
      }
    });
}
 parseDuration(duration: string): number {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

 updateDisplayTime() {
  const hours = Math.floor(this.timeLeftInSeconds / 3600);
  const minutes = Math.floor((this.timeLeftInSeconds % 3600) / 60);
  const seconds = this.timeLeftInSeconds % 60;

  this.displayTime = `${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
}

 formatNumber(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}
  ngOnInit(): void {

    this.currency=localStorage.getItem('currency');
    if(this.currency=='INR')
    {
      this.currencyClass='icon-inr'
    }
     else if(this.currency =='USA')
     {
      this.currencyClass='icon-dollar-currency-symbol'
     }

    this.route.params.subscribe((params) => {
      this.productName = params['PageName']; 
    //  this.getProductReviews(this.productName)
    this.getProductDetailsById()
    });
  }
 
  addFormControl(elementId: string) {
    this.dynamicForm.addControl(
      elementId,
      this.fb.control('', [Validators.required])
    );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }


  onSubmit() {
     this.markFormGroupTouched(this.dynamicForm);
    if (this.dynamicForm.valid) {
      const formData = this.dynamicForm.value;
      
      // Here you can send formData to your backend or handle it as needed.


this.saveallProductDeatils(formData);



    }
  }



saveallProductDeatils(formData:any)
{

  

  const data={
    "productDetailsData": {
    "customerId": 0,
    "productId": this.productId,
    "productName": this.productName,
    "price": parseFloat(this.productPrice),
    "cityName": this.cityName,
    "eggless": this.isegglessChecked,
    "deliveryDate": formData.deliveryDates ? formData.deliveryDates : null,
    "deliveryTime": formData.deliveryTimes ? formData.deliveryTimes : null,
    "additionalWeight": this.selectedQty ? this.selectedQty : null,
    "flavour": formData.flavourOptionsDto ? formData.flavourOptionsDto : null,
    "additionalNumber": formData.numberOptionsDto ? formData.numberOptionsDto : null,
    "additionalVoucher":  formData.voucherOptionsDto ? formData.voucherOptionsDto : null,
    "message": formData.message ? formData.message : null,
    "quantity": formData.quantity ? formData.quantity :0,
    "surpriseGift": null,
    "messageInsideBottle": null,
    "customPhoto": null,
    "surpriseGiftPrice": 0,
    "photoCakePrice": 0,
    "egglessPrice": this.egglessPrice,
    "sessionID": this.cookieService.get('sessionID'),
    "currencySelected":  this.currencySelected,
    "countryName": this.coutryName
  }
  }       
    this._crud.getSaveProductDetails(data).subscribe(res => {

if(res.sNo)
{
  this.sNo=res.sNo;
  this.router.navigateByUrl('/cart')
  alert(res.successMessage)
}
    });





 
}

//getRelatedProducts
getRelatedProducts(): void {
  const data={
    

    "productId": this.productId,
    "cityName": this.cityName,
    "countryName": this.coutryName,
    "currencySelected": this.currencySelected


  }        
  this._crud.getRelatedProducts(data).subscribe(res => {
   
   this.allProducts=res;
  })
}



//getProductDetailsById
getProductDetailsById(): void {
      const data={
    "SEOName": this.productName,
    "cityName": this.cityName,
    "countryName": this.coutryName,
    "currencySelected": this.currencySelected
  }       
    this._crud.getProductDetailsById(data).subscribe(res => {
     


     this.breadTitle=res.subCategoryName;
this.breadcatTitle=res.categoryName;
      this.meta.updateTag({ name: 'description',  content: res.metaDescription });
      this.meta.updateTag({ name: 'keywords',  content: res.metaKeywords });
     this.productDetails=res;
     this.productId=res.productId;
     this.isMultipleImages=res.isMultipleImages;
     this.productIamges=res.productIamges;
     this.photoRequired=this.productDetails.photoRequired
     this.leadTime=this.productDetails.leadTime;
     this.isEggless=this.productDetails.isEggless;
     this.egglessPrice= this.isEggless ? this.productDetails.egglessPrice : 0;
     this.productPrice=this.productDetails.dicountPrice

     this.stockQuantityStatus=this.productDetails?.stockQuantity ==0 ? true :false;
     this.isNewArriavalstatus=this.productDetails?.isNewArriaval;
     this.egglessstatus=this.productDetails?.egglessTagMessage;
     this.duration=this.productDetails?.sameDayBlockTime ? this.productDetails?.sameDayBlockTime : 0
   this.sameDayBlockMessage=this.productDetails.sameDayBlockMessage;
     if(this.productDetails?.sameDayBlockTime)
     {
     this.displayTimer();
     }
     if(this.stockQuantityStatus)
     {
       //few stock  // out of stock
       this.tagMsg=this.productDetails?.stockQuantityMessage;
    
       this.tagClass='errorcls'
    
     } else if( this.isNewArriavalstatus)
     {
       this.tagClass='greencls'
       this.tagMsg='Newly Added'
     }
     else if( this.egglessstatus)
     {
       this.tagClass='greencls'
       this.tagMsg=this.isEggless
     }





     this.getProductReviews(this.productId)
     this.getRelatedProducts();

this.flavourOptionsDto_array=this.productDetails.flavourOptionsDto;
this.voucherOptionsDto_array=this.productDetails.voucherOptionsDto;
this.weightOptionsDto_array=this.productDetails.weightOptionsDto;
this.numberOptionsDto_array=this.productDetails.numberOptionsDto;
this.messageRequired=this.productDetails.messageRequired;
this.deliveryDates_array=this.productDetails.deliveryDates;
if(this.deliveryDates_array.length >0)
{
  this.addFormControl('deliveryDates');
  this.addFormControl('deliveryTimes');
  setTimeout(() => {
    this.dynamicForm.get('deliveryDates')?.setValue(this.deliveryDates_array[0].deliveryDateValue);
    
    const data={
      "DeliveryDate": this.deliveryDates_array[0].deliveryDateValue,
      "Leadtime":this.leadTime,
      "ZipCode":1235,
      "InstantDelivery":false,
      "cityName": this.cityName
    }     
    this._crud.getBindDeliveryTimes(data).subscribe(res => {
     
     this.deliveryTime=res.deliveryTimingsDtos;
     this.dynamicForm.get('deliveryTimes')?.setValue(this.deliveryTime[0].dtime);
    })



  }, 1000);
  
  
}
if(this.flavourOptionsDto_array.length >0)
{
  this.addFormControl('flavourOptionsDto');
  setTimeout(() => {
    this.dynamicForm.get('flavourOptionsDto')?.setValue(this.flavourOptionsDto_array[0].optionValue);
    
  }, 1000);
}
if(this.voucherOptionsDto_array.length >0)
{
  this.addFormControl('voucherOptionsDto');
  setTimeout(() => {
    this.dynamicForm.get('voucherOptionsDto')?.setValue(this.voucherOptionsDto_array[0].optionValue);
    
  }, 1000);
}

if(this.weightOptionsDto_array.length >0)
{
  this.addFormControl('weightOptionsDto');
  setTimeout(() => {
    this.dynamicForm.get('weightOptionsDto')?.setValue(this.weightOptionsDto_array[0]);
    this.selectedQty=this.weightOptionsDto_array[0].optionValue
  }, 1000);
 
}
if(this.numberOptionsDto_array.length >0)
{
  this.addFormControl('numberOptionsDto');
  setTimeout(() => {
    this.dynamicForm.get('numberOptionsDto')?.setValue(this.numberOptionsDto_array[0].optionValue);
    
  }, 1000);
}

if(this.photoRequired)
{
  this.addFormControl('photo');
 
}

if(this.messageRequired)
{
  this.addFormControl('message');
  this.dynamicForm?.get('message')?.setValidators([this.maxLengthValidator(25)]);
  
}

    })
  }

  maxLengthValidator(maxLength: number) {
    return (control: { value: any; }) => {
      const value = control.value;

      if (value && value.length > maxLength) {
        return { maxLength: true };
      }

      return null;
    };
  }
//getRelatedProducts
getViewedProducts(): void {
          
  this._crud.getRelatedProducts('s').subscribe(res => {
   
  })
}
egglesscheck(event:any)
{
  const checkbox = event.target as HTMLInputElement;

  if (checkbox.checked) {
    // this.productPrice =parseInt(this.productDetails.dicountPrice) + this.egglessPrice
    this.productPrice =parseFloat(this.productPrice) + this.egglessPrice
    
  } else {
    this.productPrice =parseFloat(this.productPrice) - this.egglessPrice
    
  }
}
onQtyChange(e:any)
{
  this.selectedQty=this.selectedItem.optionValue;
 

if(this.isegglessChecked)
{
  this.productPrice =parseFloat(this.selectedItem.optionId) + this.egglessPrice
} else
{
  this.productPrice = this.selectedItem.optionId
}

}
getBindDeliveryTimes(e:any)
{
  const selectedValue = (e.target as HTMLSelectElement).value;
  
  const data={
    "DeliveryDate": selectedValue,
    "Leadtime":this.leadTime,
    "ZipCode":1235,
    "InstantDelivery":false,
    "cityName": this.cityName
  }     
  this._crud.getBindDeliveryTimes(data).subscribe(res => {
   
   this.deliveryTime=res.deliveryTimingsDtos;
   
  })
}

//getProductReviews
getProductReviews(id:any): void {
  const data={
    ProductId:id,
  }     
  this._crud.getProductReviews(data).subscribe(res => {
   
   this.reviewData=res;
   
  })
}




}
