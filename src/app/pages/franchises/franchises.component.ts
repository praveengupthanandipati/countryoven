import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private toastr:ToastrService,
    private meta: Meta, private title:Title,
    private _crud:CurdService, private route:ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router:Router)
  {
    
    

    this.form = this.fb.group({
      
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      mobile: ['', Validators.required],
      emailId: ['', Validators.required],
      address: ['', Validators.required],
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

  submit(): void {
    let obj = {
      // "UserID": this.userObj.UserID,
      // "pincode":  this.form.get('pincode')?.value
      "franchisesDetails": 
        {
          "firstname": this.form.get('firstname')?.value,
          "lastname": this.form.get('lastname')?.value,
          "age": this.form.get('age')?.value,
          "mobile": this.form.get('mobile')?.value,
          "emailId": this.form.get('emailId')?.value,
          "address": this.form.get('address')?.value,
          "country": this.form.get('country')?.value,
          "state": this.form.get('state')?.value,
          "city": this.form.get('city')?.value,
          "occupation": this.form.get('occupation')?.value,
          "businessHistory": this.form.get('businessHistory')?.value,
          "proposedLocation": this.form.get('proposedLocation')?.value,
         
          "message": this.form.get('message')?.value,
          // "franchiseFee": this.form.get('franchiseFee')?.value,
          // "gateWay": this.form.get('gateWay')?.value,
          // "transactionId": this.form.get('transactionId')?.value,
          // "createdDate": this.form.get('createdDate')?.value,
          "franchiseFee": 0,
          "gateWay": "string",
          "transactionId": "TN02242023144",
          "createdDate": "2023-09-15T06:01:52.768Z"
        }
      

    }
   
    this._crud.postfranchises(obj).subscribe(res => {
     
      if(res.isEroor)
  {
    
    this.toastr.error(res.errorMessage);
  }
  else
  {
    this.toastr.success(res.successMessage);
  }
     
    })
  }
  
}
