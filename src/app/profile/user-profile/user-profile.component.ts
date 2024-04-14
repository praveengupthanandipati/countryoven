import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  isLogend:boolean=false;
  email:any;
  custID:any;
  custName:any;
  userForm:any;
  countryList:any;
  stateList: any;
  cityList:any;
  msg: any;
  submitted:boolean=false;
  maxAddressLength = 100;
  textAreaInput = '';
  constructor(private titleService:Title, private meta:Meta,private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private route:Router)
  {
    this.titleService.setTitle("Countryoven's - My Profile");
    this.meta.updateTag({ name: 'description',  content: "Countryoven's - My Profile" });
    this.meta.updateTag({ name: 'keywords',  content: "Countryoven's - My Profile" });
    this.meta.updateTag({ name: 'classification',  content:"Countryoven's - My Profile" });
  
   if(localStorage.getItem('email'))
   {
    this.isLogend=true;
    this.email=localStorage.getItem('email');
    this.custID=localStorage.getItem('customerId')
    this.custName=localStorage.getItem('custName')
   }



   this.userForm = this.fb.group({
   
    customerFirstName: ['', [Validators.required, Validators.minLength(3)]],
    customerIp:  [''],
    email: [{ value: '', disabled: true }],
    MobilePhone:  [''],  
    phoneNo:  ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
    Address1:  ['',[Validators.maxLength(this.maxAddressLength)]],
    Address2:  [''],
    cityName:  [''],
    stateId:  [''],
    countryId:  [''],
    zipCode:['']

  });



  } 

  
  updateCharacterCount() {
    const addressControl = this.userForm.get('Address1');
    const currentLength = addressControl.value ? addressControl.value.length : 0;
    return currentLength;
  }
  ngOnInit(): void {
    this.gettheData(this.custID);
    
  }

  


  gettheData(custId:any)
  {
    let data={
      "customerId": custId
    }
    this._crud.getByCustomerId(data).subscribe(res => {
    
      this.userForm.patchValue(
        {
          customerFirstName: res.customerFirstName,
          email:res.primaryEmail,
          customerIp: res.customerIp,
          MobilePhone: res.mobilePhone,
          phoneNo:  res.phoneNo,
          Address1:  res.address1,
          Address2:  res.address2,
          cityName:  res.cityName,
          stateId:  res.stateId,
          countryId: res.countryId,
          zipCode:res.zipCode
        }
      );
      this.getCountry();
this.getState(res.countryId);
this.getCity(res.stateId)

    
          });
  }


  onaddCountryChange(eve: any) {
    const selectedValue = eve.target.value;
    
    this.stateList=[];
    this.cityList=[];

   
    this.getState(eve.target.value);
  }


  onstateChange(eve: any) {
    
    const selectedValue = eve.target.value;
    
    this.cityList=[];
   
    this.getCity(selectedValue)
  }


  getCity(id: any) {
    let data = {
      stateId: id
    }
    this._crud.getCity(data).subscribe(res => {
      
      this.cityList = res;
    });
  }

getCountry()
{
  let data={}
  this._crud.getCountry(data).subscribe(res => {
    
    this.countryList=res;
  });
}

getState(id:any)
{
  let data={
    countryId:id
  }
  this._crud.getState(data).subscribe(res => {
   
    this.stateList=res;
  });
}

  onSubmit()
  { 
this.submitted=true;

    if(this.userForm.valid)
    {
      let data={
        "id": this.custID,
        "customerDetails": {
          "customerFirstName": this.userForm.value['customerFirstName'],
          "customerIp": this.userForm.value['customerIp'],
          "MobilePhone":"" + this.userForm.value['MobilePhone'] + "",
          "phoneNo": this.userForm.value['phoneNo'].toString(),
          "Address1": this.userForm.value['Address1'],
          // "Address2":this.userForm.value['Address2'],
          "cityName":this.userForm.value['cityName'],
          "stateId": this.userForm.value['stateId'],
          "countryId": this.userForm.value['countryId'],
          "zipCode": ""+ this.userForm.value['zipCode'] + ""
        }
      }
      this._crud.updateProfile(data).subscribe(res => {
        
      if(res.isEroor)
      {
        
        this.toastr.error(res.errorMessage);
        this.msg=res.errorMessage;
      }
      else
      {
        //this.toastr.success(res.successMessage);

        this.msg=res.successMessage;
        localStorage.setItem('custName', this.userForm.value['customerFirstName']);
        Swal.fire({
          width:'350px',
       // imageUrl: '../../assets/images/tick.png',
        imageHeight: 80,
        text: this.msg,  
        showCancelButton: false,
        confirmButtonText:'Okay'
      }).then((result) => {
        if (result.isConfirmed) {
          
         window.location.reload();
    
    
        }
      });
    
        //this.route.navigateByUrl('/login')
      }
            });
    }
  
  }

gotodashboard()
{
  this.route.navigateByUrl('/myaccount/dashboard')
}


onMessageInputChange() {

  // this.maxLength = 40 - this.textAreaInput.length;
  if (this.textAreaInput.length > 100) {

    this.textAreaInput = this.textAreaInput.substring(0, 100);

    // this.isMaxLengthExceeded = true;
  } else {

    //  this.isMaxLengthExceeded = false;
  }
}
}
