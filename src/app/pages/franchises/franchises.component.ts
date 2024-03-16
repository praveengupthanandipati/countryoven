import { Component, Renderer2 } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-franchises',
  templateUrl: './franchises.component.html',
  styleUrls: ['./franchises.component.scss']
})
export class FranchisesComponent {
  dynamicForm:any;
  form!: FormGroup;
  maxAddressLength:any=100;
  submitted:boolean=false;
  constructor(
    private renderer:Renderer2,
    private titleService:Title, 
    private toastr:ToastrService,
    private meta: Meta, private title:Title,
    private _crud:CurdService, private route:ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router:Router)
  {
    
    
      this.titleService.setTitle('Cakes, Florist Shop Franchise Business Opportunities | country oven');
      this.meta.updateTag({ name: 'description',  content: 'Country Oven offer cakes, florist, combos, confectionery and gift shop Franchise Business opportunities in India - Inquire for low-cost.' });
      this.meta.updateTag({ name: 'keywords',  content: 'Country Oven-CouponPartnerscakes, florist, combos, gifts, confectionery' });
      this.meta.updateTag({ name: 'classification',  content: 'Country Oven offer cakes, florist, combos, confectionery and gift shop Franchise Business opportunities in India - Inquire for low-cost.' });
    
    

    this.form = this.fb.group({
      
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      mobile: ['',  [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      emailId: ['', [Validators.required,Validators.email]],
      address: ['', [Validators.maxLength(this.maxAddressLength)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      occupation: ['', Validators.required],
      businessHistory: ['', Validators.required],
      proposedLocation: ['', Validators.required],
      message: ['', Validators.required],
      franchiseFee: [''],
      gateWay: [''],
      transactionId: [''],
      createdDate: [''],
    });
  }

  
  updateCharacterCount() {
    const addressControl = this.form.get('address');
    const currentLength = addressControl?.value ? addressControl.value.length : 0;
    return currentLength;
  }
  
addLoader() {
  this.renderer.addClass(document.body, 'bodyloader');
}
removeLoader() {
  this.renderer.removeClass(document.body, 'bodyloader');
}
  submit(): void {
    this.submitted=true;
    if(this.form.valid)
    {
  this.addLoader();

    let obj = {
      // "UserID": this.userObj.UserID,
      // "pincode":  this.form.get('pincode')?.value
      "franchisesDetails": 
        {
          "firstname": this.form.get('firstname')?.value,
          "lastname": this.form.get('lastname')?.value,
          "age": this.form.get('age')?.value,
          "mobile": this.form.get('mobile')?.value.toString(),
          "emailId": this.form.get('emailId')?.value,
          "address": this.form.get('address')?.value,
          "country": this.form.get('country')?.value,
          "state": this.form.get('state')?.value,
          "city": this.form.get('city')?.value,
          "occupation": this.form.get('occupation')?.value,
          "businessHistory": this.form.get('businessHistory')?.value,
          "proposedLocation": this.form.get('proposedLocation')?.value,
         
          "message": this.form.get('message')?.value,
         
          "franchiseFee": 0,
          "gateWay": "string",
          "transactionId": "TN02242023144",
          "createdDate": "2023-09-15T06:01:52.768Z"
        }
      

    }
   
    this._crud.postfranchises(obj).subscribe(res => {
     this.removeLoader();
      if(res.isEroor)
  {
    
    this.toastr.error(res.errorMessage);
  }
  else
  {
    this.submitted=false;
    this.toastr.success(res.successMessage);
    this.form.reset();
  }
     
    })
  }
}
  
}
