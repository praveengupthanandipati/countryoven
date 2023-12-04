import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute,  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  constructor(
    private meta: Meta, private title:Title,
    private _crud:CurdService, private route:ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router:Router)
  {
    this.dynamicForm = this.fb.group({});
    this.cityName=localStorage.getItem('city')

this.coutryName=localStorage.getItem('country');
this.currencySelected=localStorage.getItem('currency');

  }
  ngOnInit(): void {
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

  onSubmit() {
  
    if (this.dynamicForm.valid) {
      const formData = this.dynamicForm.value;
      console.log('Form data:', formData);
      // Here you can send formData to your backend or handle it as needed.
console.log(formData.numberOptionsDto)

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
    "price": this.productPrice,
    "cityName": this.cityName,
    "eggless": this.isegglessChecked,
    "deliveryDate": formData.deliveryDates ? formData.deliveryDates : null,
    "deliveryTime": formData.deliveryTimes ? formData.deliveryTimes : null,
    "additionalWeight": formData.weightOptionsDto ? formData.weightOptionsDto.toString() : null,
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
console.log(res)
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
   console.log(res)
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
     console.log(res);


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
  console.log('1s')
}
if(this.flavourOptionsDto_array.length >0)
{
  this.addFormControl('flavourOptionsDto');
  console.log('1')
}
if(this.voucherOptionsDto_array.length >0)
{
  this.addFormControl('voucherOptionsDto');
  console.log('2')
}

if(this.weightOptionsDto_array.length >0)
{
  this.addFormControl('weightOptionsDto');
  setTimeout(() => {
    this.dynamicForm.get('weightOptionsDto')?.setValue(this.weightOptionsDto_array[0].optionId);
    console.log(this.weightOptionsDto_array[0])
  }, 1000);
 
}
if(this.numberOptionsDto_array.length >0)
{
  this.addFormControl('numberOptionsDto');
 
}

if(this.photoRequired)
{
  this.addFormControl('photo');
 
}

if(this.messageRequired)
{
  this.addFormControl('message');
  console.log('5')
}


// flavourOptionsDto_array:any;
// voucherOptionsDto_array:any;
// weightOptionsDto_array:any;
// numberOptionsDto_array:any;
// messageRequired:any;
// photoRequired:any;



    
   




    })
  }

  
//getRelatedProducts
getViewedProducts(): void {
          
  this._crud.getRelatedProducts('s').subscribe(res => {
   console.log(res)
   
  })
}
egglesscheck(event:any)
{
  const checkbox = event.target as HTMLInputElement;

  if (checkbox.checked) {
    this.productPrice =parseInt(this.productDetails.dicountPrice) + this.egglessPrice
    
  } else {
    this.productPrice =this.productDetails.dicountPrice; 
    
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
   console.log(res)
   this.deliveryTime=res.deliveryTimingsDtos;
   
  })
}

//getProductReviews
getProductReviews(id:any): void {
  const data={
    ProductId:id,
  }     
  this._crud.getProductReviews(data).subscribe(res => {
   console.log(res)
   this.reviewData=res;
   
  })
}




}
