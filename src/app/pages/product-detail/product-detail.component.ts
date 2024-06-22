import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, timer } from 'rxjs';
import { CurdService } from 'src/app/services/curd.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
showpincode:boolean=false;
prevpincode:any;
  productName: any;
  cityName: any;
  coutryName: any;
  currencySelected: any;
  sessionId: any;
  productId: any;
  isMultipleImages: boolean = false;
  productIamges: any;
  productDetails: any;
  reviewData: any;
  allProducts: any;
  dynamicForm: FormGroup;
  flavourOptionsDto_array: any;
  voucherOptionsDto_array: any;
  weightOptionsDto_array: any;
  numberOptionsDto_array: any;
  pincodeOptionsDto_array: any = [];
  messageRequired: boolean = false;
  photoRequired: boolean = false;
  photoCake: boolean = false;
  deliveryDates_array: any;
  leadTime: any;
  deliveryTime: any;
  isEggless: any;
  egglessPrice: number = 0;
  photoCakePrice: number = 0;
  productPrice: any;
  originalproductPrice: any;
  isegglessChecked: boolean = false;
  sNo: any;
  breadTitle: any;
  breadcatTitle: any;
  currency: any;
  currencyClass: any;
  stockQuantityStatus: boolean = false;
  inActiveProduct: boolean = false;
  isNewArriavalstatus: boolean = false;
  egglessstatus: boolean = false;
  tagMsg: any;
  tagClass: any;
  duration: string = ''; // Input in the format "HH:mm:ss"
  timeLeftInSeconds: number = 0;
  timerSubscription: Subscription = new Subscription;
  displayTime: any;
  textAreaInput = '';
  isMaxLengthExceeded = false;
  maxLength: any = 40;
  maxLengthFixed: any = 40;
  message: string = '';
  sameDayBlockMessage: any;
  selectedItem: any;
  selectedVoucher: any;
  selectedQty: any;
  egglessAddtionalPrice: number = 0;
  photoCakeAdditionalPrice: number = 0;
  pName: any;
  selectedFile: any;
  selectedVocucher: any;
  customerId: any = 0; 
  courierProductMessage:any;
  fewStockMessage:any;
  customOptions: OwlOptions = {
    loop: false,
    autoplayTimeout: 3000,
    autoplay: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 35,
    animateIn: true,
    animateOut: 'fadeOut',
    dots: false,
    nav:false,
    navSpeed: 700,
    navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      300: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    }
  }
  myThumbnail: any;
  myFullresImage: any;


  constructor(
    private titleService: Title,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private meta: Meta, private title: Title,
    private _crud: CurdService, private route: ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router: Router) {
    this.dynamicForm = this.fb.group({});
    this.cityName = localStorage.getItem('city')
    this.customerId = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : 0
    this.coutryName = localStorage.getItem('country');
    this.currencySelected = localStorage.getItem('currency');

  }

  scrollToElement(elementId: string): void {
    const element = this.elementRef.nativeElement.querySelector(`#${elementId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  ngOnInit(): void {
    this.addLoader();
 this.setcounntry();
    this.route.params.subscribe((params) => {
      
      this.productName = params['PageName'];
      if(!localStorage.getItem('country') || !localStorage.getItem('currency'))
      {


        this._crud.getIpAddress().subscribe((data: any) => {
          let userIp = data.ip;

        this._crud.getCountryusingIp1(userIp).subscribe((data: any) => {

          let coun;
          if (data.country == 'IN') {
            coun = 'India'
          }
          else {
            coun = data.country;
          }
    if(!localStorage.getItem('country'))
    { 
      localStorage.setItem('country', coun)
    }
 
  if(localStorage.getItem('country') == 'India')
  {
    if(!localStorage.getItem('currency'))
    {      
    localStorage.setItem('currency', 'INR')
    }
  }
  else
  {
    if(!localStorage.getItem('currency'))
    {      
    localStorage.setItem('currency', 'USD')
    }
  }
  this.setcounntry()
  
setTimeout(() => {

if(params['cityname'] == 'send-online')
{
  this.getProductDetailsById();
}
}, 500);
  

  });

});

      }  else{
        if(params['cityname'] == 'send-online')
{
        this.getProductDetailsById();
}
      }
         
    });



    this.addCanonicalLink(this.router.url)


  }

  
setcounntry()
{
  this.currency = localStorage.getItem('currency');
  if (this.currency == 'INR') {
    this.currencyClass = 'icon-inr'
  }
  else if (this.currency == 'USD') {
    this.currencyClass = 'icon-dollar-currency-symbol'
  }
  this.coutryName = localStorage.getItem('country');
  this.currencySelected = localStorage.getItem('currency');
}



  addLoader() {
    this.renderer.addClass(document.body, 'bodyloader');
  }
  removeLoader() {
    this.renderer.removeClass(document.body, 'bodyloader');
  }


  onInput(event: Event): void {
    
    const target = event.target as HTMLTextAreaElement;
    const currentLength = target.value.length;

    if (currentLength > 25) {
      target.value = target.value.substring(0, 25);
      this.textAreaInput = target.value; // Update ngModel binding
      this.isMaxLengthExceeded = true;
    } else {
      this.isMaxLengthExceeded = false;
    }
  }

  displayTimer() {
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



    } else{
      this.scrollToElement('elementId')
    //  window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  }



  saveallProductDeatils(formData: any) {

    this.addLoader();

    const data = {
      "productDetailsData": {
        "customerId": this.customerId,
        "productId": this.productId,
        "productName": this.pName,
        "price": parseFloat(this.productPrice),
        "cityName": this.cityName,
        "eggless": this.isegglessChecked,
        "deliveryDate": formData.deliveryDates ? formData.deliveryDates : null,
        "deliveryTime": formData.deliveryTimes ? formData.deliveryTimes : null,
        "additionalWeight": this.selectedQty ? this.selectedQty : null,
        "flavour": formData.flavourOptionsDto ? formData.flavourOptionsDto : null,
        "additionalNumber": formData.numberOptionsDto ? formData.numberOptionsDto : null,
        "additionalVoucher": this.selectedVocucher ? this.selectedVocucher : null,
        "message": formData.message ? formData.message : null,
        "quantity": formData.quantity ? formData.quantity : 0,
        "surpriseGift": null,
        "messageInsideBottle": null,
        // "customPhoto": null,
        "surpriseGiftPrice": 0,
        "photoCakePrice": this.photoCakePrice,
        "egglessPrice": this.egglessPrice,
        "sessionID": this.cookieService.get('sessionID'),
        "currencySelected": this.currencySelected,
        "countryName": this.coutryName,
        "PinCode": formData.pincodeOptionsDto ? formData.pincodeOptionsDto : null,
      }
    }
    this._crud.getSaveProductDetails(data).subscribe(res => {
      if(!res.isEroor)     
        {
      if (res.sNo) {
        this.sNo = res.sNo;

        if (this.photoRequired) {
          this.photoUpload(this.sNo)
        }

        else {
          this.removeLoader();
          this.router.navigateByUrl('/cart')
        }



        // alert(res.successMessage)
      }


    }
    else
    {
      
      this.removeLoader();
    }
    });






  }

  //getRelatedProducts
  getRelatedProducts(): void {
    const data = {


      "productId": this.productId,
      "cityName": this.cityName,
      "countryName": this.coutryName,
      "currencySelected": this.currencySelected


    }
    this._crud.getRelatedProducts(data).subscribe(res => {

      this.allProducts = res;
    })
  }

  changeImage(image: string) {
    this.myThumbnail = image;
    this.myFullresImage=image
  //  let index = this.productImagesCompress.indexOf(image);
    //this.myFullresImage = this.productImages[index];
  }



  //getProductDetailsById
  getProductDetailsById(): void {



    const data = {
      "SEOName": this.productName,
      "cityName": this.cityName,
      "countryName": this.coutryName,
      "currencySelected": this.currencySelected,
      "sessionId":  this.cookieService.get('sessionID')
    }
    this._crud.getProductDetailsById(data).subscribe(res => {
      

if(res.isError)
{
  this.router.navigateByUrl('/')

}

      this.removeLoader();
      this.titleService.setTitle(res.title);
      this.breadTitle = res.subCategoryName;
      this.breadcatTitle = res.categoryName;
      this.meta.updateTag({ name: 'description', content: res.metaDescription });
      this.meta.updateTag({ name: 'keywords', content: res.metaKeywords });
      this.productDetails = res;
      this.productId = res.productId;
      this.isMultipleImages = res.isMultipleImages;
      this.productIamges = res.productIamges;
      this.courierProductMessage=res.courierProductMessage;
      this.fewStockMessage=res.fewStockMessage;
if(this.isMultipleImages)
{
  this.myThumbnail= this.productIamges[0].imageName;
  this.myFullresImage= this.productIamges[0].imageName;
}
      // this.myThumbnail = res.data?.product_image || "https://api.myverkoper.com/assets/seller/images/mvk-no-image.png";
      // this.myFullresImage = res.data?.product_image || "https://api.myverkoper.com/assets/seller/images/mvk-no-image.png";

      this.photoRequired = this.productDetails.photoRequired
      if (this.productDetails.categoryId == '1020') {
        this.photoCake = true
      }

      this.leadTime = this.productDetails.leadTime;
      this.isEggless = this.productDetails.isEggless;
      this.egglessPrice = this.isEggless ? this.productDetails.egglessPrice : 0;
      this.photoCakePrice = this.productDetails.photoCakePrice ? this.productDetails.photoCakePrice : 0;
      this.productPrice = this.productDetails.dicountPrice;
      this.pName = this.productDetails.productName;
      this.originalproductPrice = this.productDetails.dicountPrice;
      this.stockQuantityStatus = parseInt(this.productDetails?.stockQuantity) <= 0 ? true : false;
      this.inActiveProduct = this.productDetails?.inActiveProduct ? true : false;
      this.isNewArriavalstatus = this.productDetails?.isNewArriaval;
      this.egglessstatus = this.productDetails?.egglessTagMessage;
      this.duration = this.productDetails?.sameDayBlockTime ? this.productDetails?.sameDayBlockTime : 0
      this.sameDayBlockMessage = this.productDetails.sameDayBlockMessage;
      this.maxLengthFixed = this.productDetails.maxLength;
      this.maxLength = this.productDetails.maxLength;
      this.prevpincode=this.productDetails.previousPinCode;
      if (this.photoCakePrice > 0) {
        this.productPrice = parseFloat(this.productPrice) + this.photoCakePrice
      }


      if (this.productDetails?.sameDayBlockTime) {
        this.displayTimer();
      }
      if (this.stockQuantityStatus || this.productDetails?.stockQuantityMessage) {
        //few stock  // out of stock
        this.tagMsg = this.productDetails?.stockQuantityMessage;

        this.tagClass = 'errorcls'


        if (this.tagMsg == 'Few Stock') {
                  this.tagClass = 'bluecls'
                } 


      }  else if (this.isNewArriavalstatus) {
        this.tagClass = 'bluecls'
        this.tagMsg = this.productDetails?.newTagMessage
      }
      else if (this.egglessstatus) {
        this.tagClass = 'greencls'
        this.tagMsg = 'EGGLESS ALSO'
      }




if(this.productId)
{
      this.getProductReviews(this.productId)
      this.getRelatedProducts();
}
      this.flavourOptionsDto_array = this.productDetails.flavourOptionsDto;
      this.voucherOptionsDto_array = this.productDetails.voucherOptionsDto;
      this.weightOptionsDto_array = this.productDetails.weightOptionsDto;
      this.numberOptionsDto_array = this.productDetails.numberOptionsDto;
      this.messageRequired = this.productDetails.messageRequired;
      this.deliveryDates_array = this.productDetails.deliveryDates;
      if (this.deliveryDates_array.length > 0) {
        this.addFormControl('deliveryDates');
        this.addFormControl('deliveryTimes');
        setTimeout(() => {
let d;
          if(this.productDetails.previousSelectedDate  && this.productDetails.previousSelectedDate !='')
          {
            this.dynamicForm.get('deliveryDates')?.setValue(this.productDetails.previousSelectedDate);
          d=this.productDetails.previousSelectedDate
          }
          else
          {
            this.dynamicForm.get('deliveryDates')?.setValue(this.deliveryDates_array[0].deliveryDateValue);
            d=this.deliveryDates_array[0].deliveryDateValue
          }
        

          const data = {
            "DeliveryDate": d,
            "Leadtime": this.leadTime,
            "ZipCode": 1235,
            "InstantDelivery": false,
            "cityName": this.cityName,
            "ProductId": this.productId,
            "sessionId": this.cookieService.get('sessionID')
          }
          this._crud.getBindDeliveryTimes(data).subscribe(res => {

            this.deliveryTime = res.deliveryTimingsDtos;


            if(this.productDetails.previousSelectedTime  && this.productDetails.previousSelectedTime !='')
            {
              this.dynamicForm.get('deliveryTimes')?.setValue(this.productDetails.previousSelectedTime);
            }
            else
            {
              this.dynamicForm.get('deliveryTimes')?.setValue(this.deliveryTime[0].dtime);
            }

         //   this.dynamicForm.get('deliveryTimes')?.setValue(this.deliveryTime[0].dtime);

            /* pincode */

            this.pincodeOptionsDto_array = res.deliveryPinCodes;
            if (this.pincodeOptionsDto_array?.length > 0) {
              
              this.showpincode=true;
              this.addFormControl('pincodeOptionsDto');
              setTimeout(() => {
                this.dynamicForm.get('pincodeOptionsDto')?.setValue(null);
                
if(this.prevpincode !=null)
  {
    
    this.dynamicForm.get('pincodeOptionsDto')?.setValue(this.prevpincode);
  }
              }, 1000);

            




              

            } else
            {
              this.showpincode=false;
            }
            /* pincode */



          })



        }, 1000);


      }
      if (this.flavourOptionsDto_array.length > 0) {
        this.addFormControl('flavourOptionsDto');
        setTimeout(() => {
          //  this.dynamicForm.get('flavourOptionsDto')?.setValue(this.flavourOptionsDto_array[0].optionValue);
          this.dynamicForm.get('flavourOptionsDto')?.setValue(null);
        }, 1000);
      }
      if (this.voucherOptionsDto_array.length > 0) {
        this.addFormControl('voucherOptionsDto');
        setTimeout(() => {

          this.dynamicForm.get('voucherOptionsDto')?.setValue(this.voucherOptionsDto_array[0]);
          this.selectedVocucher = this.voucherOptionsDto_array[0].optionValue
        }, 1000);
      }

      if (this.weightOptionsDto_array.length > 0) {
        this.addFormControl('weightOptionsDto');
        setTimeout(() => {
          this.dynamicForm.get('weightOptionsDto')?.setValue(this.weightOptionsDto_array[0]);
          this.selectedQty = this.weightOptionsDto_array[0].optionValue
        }, 1000);

      }




      if (this.numberOptionsDto_array.length > 0) {
        this.addFormControl('numberOptionsDto');
        setTimeout(() => {
          // this.dynamicForm.get('numberOptionsDto')?.setValue(this.numberOptionsDto_array[0].optionValue);
          this.dynamicForm.get('numberOptionsDto')?.setValue(null);
        }, 1000);


      



      }

      if (this.photoRequired) {
        this.addFormControl('photo');

      }

      if (this.messageRequired) {
        this.addFormControl('message');
        this.dynamicForm?.get('message')?.setValidators([this.maxLengthValidator(this.maxLengthFixed)]);

      }

    }, (error)=>{
      this.removeLoader()
        } )
  } 

  onMessageInputChange() {

    this.maxLength = this.maxLengthFixed - this.textAreaInput.length;
    if (this.textAreaInput.length > this.maxLengthFixed) {

      this.textAreaInput = this.textAreaInput.substring(0, this.maxLengthFixed);
      this.isMaxLengthExceeded = true;
    } else {
      this.isMaxLengthExceeded = false;
    }
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

  egglesscheck(event: any) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      // this.productPrice =parseInt(this.productDetails.dicountPrice) + this.egglessPrice

      let result = parseFloat(this.productPrice) + this.egglessPrice
      if (this.currencySelected == 'USD') {
        this.productPrice = result.toFixed(2)
      }
      else {
        this.productPrice = result
      }





      this.isegglessChecked = true;
    } else {
      this.isegglessChecked = false;
      let result = parseFloat(this.productPrice) - this.egglessPrice


      if (this.currencySelected == 'USD') {
        this.productPrice = result.toFixed(2)
      }
      else {
        this.productPrice = result
      }



    }
  }


  onVoucherChange(e: any) {

    
    this.productPrice = this.selectedVoucher.optionId
    this.selectedVocucher = this.selectedVoucher.optionValue
    //     this.selectedQty = this.selectedItem.optionValue;
    //     if(this.photoRequired)
    //     {
    // this.photoCakePrice=this.selectedItem.photoCakeAdditionalPrice;
    //     }
    // this.egglessPrice=this.selectedItem.egglessAddtionalPrice

    
    //     if (this.isegglessChecked) {
    //       this.productPrice = parseFloat(this.selectedItem.optionId) + this.egglessPrice + this.photoCakePrice
    //     } else {
    //       this.productPrice = parseFloat(this.selectedItem.optionId) + this.photoCakePrice
    //     }

  }


  onQtyChange(e: any) {
    this.selectedQty = this.selectedItem.optionValue;
    if (this.photoRequired || this.photoCake) {
      this.photoCakePrice = this.selectedItem.photoCakeAdditionalPrice;
    }
    this.egglessPrice = this.selectedItem.egglessAddtionalPrice

    
    if (this.isegglessChecked) {
      let result = parseFloat(this.selectedItem.optionId) + this.egglessPrice + this.photoCakePrice
      if (this.currencySelected == 'USD') {
        this.productPrice = result.toFixed(2)
      }
      else {
        this.productPrice = result
      }

    } else {
      let result = parseFloat(this.selectedItem.optionId) + this.photoCakePrice
      if (this.currencySelected == 'USD') {
        this.productPrice = result.toFixed(2)
      }
      else {
        this.productPrice = result
      }

    }


  }


getBindPincode(e:any)
{
  const selectedValue = (e.target as HTMLSelectElement).value;
  
  this.prevpincode=selectedValue
}



  getBindDeliveryTimes(e: any) {
    const selectedValue = (e.target as HTMLSelectElement).value;
    const data = {
      "DeliveryDate": selectedValue,
      "Leadtime": this.leadTime,
      "ZipCode": 1235,
      "InstantDelivery": false,
      "cityName": this.cityName,
      "ProductId": this.productId,
      "sessionId": this.cookieService.get('sessionID')
    }
    this._crud.getBindDeliveryTimes(data).subscribe(res => {

      this.deliveryTime = res.deliveryTimingsDtos;


      this.dynamicForm.get('deliveryTimes')?.setValue(this.deliveryTime[0].dtime);
      

   /* pincode */

   this.pincodeOptionsDto_array = res.deliveryPinCodes;
   if (this.pincodeOptionsDto_array?.length > 0) {
     this.showpincode=true;

    if( this.dynamicForm.get('pincodeOptionsDto') !==null)
    {
     this.addFormControl('pincodeOptionsDto');
    }
     setTimeout(() => {
       this.dynamicForm.get('pincodeOptionsDto')?.setValue(null);
      
              
       if(this.prevpincode !=null)
        {
          
          this.dynamicForm.get('pincodeOptionsDto')?.setValue(this.prevpincode);
        }


     }, 1000);

   } else
   {
     this.showpincode=false;
     this.dynamicForm.get('pincodeOptionsDto')?.clearValidators();
     this.dynamicForm.get('pincodeOptionsDto')?.updateValueAndValidity();
   }
   /* pincode */


    })
  }

  //getProductReviews
  getProductReviews(id: any): void {
    const data = {
      ProductId: id,
    }
    this._crud.getProductReviews(data).subscribe(res => {

      this.reviewData = res;

    })
  }





  onFileSelected(event: any): void {

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = event.target.files[0];

    if (file && allowedTypes.includes(file.type)) {
      // File is valid, you can update the form control value
      this.selectedFile = event.target.files[0];
    } else {
      // Reset the form control and show an error message

      
    }



  }



  photoUpload(no: any) {

    let sNo = no;
    let formData = new FormData();
    formData.append('ImagePath', this.selectedFile);
    formData.append('SNo', sNo);
    this._crud.AddPhotoCake(formData).subscribe(res => {
      this.removeLoader();
      if (res.isEroor) {
        // this.toastr.error('Unable to proceed');
      }
      else {
        this.router.navigateByUrl('/cart')
      }

    })


  }

  routeCity(e: any) {
    this.router.navigateByUrl(e.toLowerCase() + '/gift-online');
  }




  private addCanonicalLink(v:any) {


    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com' + v;
    }
    else
    {

      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';
      
    
      link.href = 'https://www.countryoven.com' + v; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }


  }

}
