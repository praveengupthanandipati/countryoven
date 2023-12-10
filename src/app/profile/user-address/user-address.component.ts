import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
  deliverAddress: any;
  isLogend: boolean = false;
  email: any;
  custID: any;
  custName: any;
  userForm: any;
  adduserForm: any;
  countryList: any;
  stateList: any;

  addressId: any;


  @ViewChild('AddButton')
  AddButton!: ElementRef;


  @ViewChild('EditButton')
  EditButton!: ElementRef;
  cityList: any;



  constructor(private renderer: Renderer2, private _crud: CurdService, private fb: FormBuilder, private el: ElementRef, private toastr: ToastrService) {




    if (localStorage.getItem('email')) {
      this.isLogend = true;
      this.email = localStorage.getItem('email');
      this.custID = localStorage.getItem('customerId')
      this.custName = localStorage.getItem('custName')
    }

    this.userForm = this.fb.group({
      recipientFirstName: ['', Validators.required],
      recipientLastName: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      landmark: ['', Validators.required],
      cityName: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: ['', Validators.required],
      zipCode: ['', Validators.required],
    });


    this.adduserForm = this.fb.group({
      addRecipientFirstName: ['', Validators.required],
      addRecipientLastName: ['', Validators.required],
      addEmail: [''],
      addPhone: ['', Validators.required],
      addMobilePhone: ['', Validators.required],
      addaddress1: ['', Validators.required],
      addaddress2: ['', Validators.required],
      addlandmark: ['', Validators.required],
      addcityName: ['', Validators.required],
      addstateId: ['', Validators.required],
      addcountryId: ['', Validators.required],
      addzipCode: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    this.getAddressByCustomerId();

  }

  onaddCountryChange(eve: any) {
    const selectedValue = eve.target.value;
    
    this.stateList=[];
    this.cityList=[];

    this.userForm.patchValue(
      { cityName: '',
        stateId: ''
       }
    );
    this.adduserForm.patchValue(
      { cityName: '',
        stateId: ''
       }
    )

    this.getState(selectedValue);
  }
  onstateChange(eve: any) {
    const selectedValue = eve.target.value;
    
    this.cityList=[];
    this.userForm.patchValue(
      { cityName: '',
        
       }
    )
    this.adduserForm.patchValue(
      { cityName: '',
        
       }
    )
    this.getCity(selectedValue)
  }

  onAddSubmit() {

    
    let data = {

      "addressBookDetails": {
        "customerId": this.custID,
        "addressId": 0,
        "RecipientFirstName": this.adduserForm.value['addRecipientFirstName'],
        "RecipientLastName": this.adduserForm.value['addRecipientLastName'],
        "email": this.adduserForm.value['addEmail'],
        "Phone": this.adduserForm.value['addPhone'],
        "MobilePhone": this.adduserForm.value['addMobilePhone'],
        "address1": this.adduserForm.value['addaddress1'],
        "address2": this.adduserForm.value['addaddress2'],
        "landmark": this.adduserForm.value['addlandmark'],
        "cityName": this.adduserForm.value['addcityName'],
        "stateId": this.adduserForm.value['addstateId'],
        "countryId": this.adduserForm.value['addcountryId'],
        "zipCode": this.adduserForm.value['addzipCode'],
        "relationshipId": 10,
        "status": true
      }
    }
    this._crud.addAddress(data).subscribe(res => {
      
      if (!res.isEroor) {
        this.toastr.success(res.successMessage);
        const button: HTMLButtonElement = this.AddButton.nativeElement;
        button.click();
        this.getAddressByCustomerId();
      }
      else {
        this.toastr.error(res.errorMessage)
      }
    });

  }



  onSubmit() {
    
    let data = {
      "addressId": this.addressId,
      "addressBookDetails": {
        "recipientFirstName": this.userForm.value['recipientFirstName'],
        "recipientLastName": this.userForm.value['recipientLastName'],
        "email": this.userForm.value['email'],
        "phone": this.userForm.value['phone'],
        "mobilePhone": this.userForm.value['mobilePhone'],
        "address1": this.userForm.value['address1'],
        "address2": this.userForm.value['address2'],
        "landmark": this.userForm.value['landmark'],

        "cityName": this.userForm.value['cityName'],
        "stateId": this.userForm.value['stateId'],
        "countryId": this.userForm.value['countryId'],
        "zipCode": this.userForm.value['zipCode'],
        "relationshipId": 10,
        "status": true

      }
    }


    this._crud.updateAddress(data).subscribe(res => {
      
      if (!res.isEroor) {
        this.toastr.success(res.successMessage)
        const button: HTMLButtonElement = this.EditButton.nativeElement;
        button.click();
        this.getAddressByCustomerId();

      }
      else {
        this.toastr.error(res.errorMessage)
      }
    });


  }

  getAddressByCustomerId() {
    let data = { "customerId": this.custID }
    this._crud.getAddressByCustomerId(data).subscribe(res => {
      
      this.deliverAddress = res;
    });
  }
  addNewAddress() {

    this.stateList = [];
    this.countryList = [];
    this.getCountry();
  }
  editAddress(addId: any) {

    this.stateList = [];
    this.countryList = [];
    this.cityList=[];
    this.userForm.reset();
    let data = { "AddressId": addId }
    this.getAddressByAddressId(addId)
    this.addressId = addId
  }
  getAddressByAddressId(id: any) {
    let data = { "AddressId": id }
    this._crud.getAddressByAddressId(data).subscribe(res => {
      


      this.userForm.patchValue(
        {
          recipientFirstName: res.recipientFirstName,
          recipientLastName: res.recipientLastName,
          email: res.email,
          phone: res.phone,
          mobilePhone: res.mobilePhone,
          address1: res.address1,
          address2: res.address2,
          landmark: res.landmark,
          cityName: res.cityName,
          stateId: res.stateId,
          countryId: res.countryId,
          zipCode: res.zipCode

        }
      );

      
      this.getCountry();
      this.getState(res.countryId);

this.getCity(res.stateId)


      //  this.deliverAddress=res;
    });
  }


  getCountry() {
    let data = {}
    this._crud.getCountry(data).subscribe(res => {
      
      this.countryList = res;
    });
  }

  getState(id: any) {
    let data = {
      countryId: id
    }
    this._crud.getState(data).subscribe(res => {
      
      this.stateList = res;
    });
  }

  getCity(id: any) {
    let data = {
      stateId: id
    }
    this._crud.getCity(data).subscribe(res => {
      
      this.cityList = res;
    });
  }



  deleteAddress(addId: any, custId: any) {
    let data = {
      "AddressId": addId,
      "customerId": custId
    }
    this._crud.deleteAddress(data).subscribe(res => {

      if (!res.isEroor) {
        this.toastr.success(res.successMessage);
        this.getAddressByCustomerId();
      }
      else {
        this.toastr.error(res.errorMessage)
      }

      //  this.deliverAddress=res;
    });
  }
}
