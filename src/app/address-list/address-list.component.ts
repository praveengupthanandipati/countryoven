import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  deliverAddress: any;
  originalAddress:any;
  isLogend: boolean = false;
  email: any;
  custID: any;
  custName: any;
  userForm: any;
  adduserForm: any;
  countryList: any;
  stateList: any;
  selectedaddress:any;
  addressId: any;
  submitted:boolean=false;
  addsubmitted:boolean=false;

  @ViewChild('AddButton')
  AddButton!: ElementRef;


  @ViewChild('EditButton')
  EditButton!: ElementRef;
  cityList: any;

  @Input('checkoutaddress') checkoutaddress:boolean=false;
  @Input('selectedAddressId') selectedAddressId:any;
  @Output() sendAddId:any= new EventEmitter<any>();
isCheckout:boolean=false;
addressidobj:any=[];
  constructor(private renderer: Renderer2, private _crud: CurdService, private fb: FormBuilder, private el: ElementRef, private toastr: ToastrService) {




    if (localStorage.getItem('email')) {
      this.isLogend = true;
      this.email = localStorage.getItem('email');
      this.custID = localStorage.getItem('customerId')
      this.custName = localStorage.getItem('custName')
    }

    this.userForm = this.fb.group({
      recipientFirstName: ['',  [Validators.required, Validators.minLength(3)]],
      recipientLastName: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      landmark: ['', Validators.required],
      cityName: [''],
      stateId: ['1479'],
    //  countryId: ['', Validators.required],
      zipCode: ['',  [Validators.required, Validators.minLength(6)]],
    });


    this.adduserForm = this.fb.group({
      addRecipientFirstName: ['', [Validators.required, Validators.minLength(3)]],
      addRecipientLastName: ['', Validators.required],
      addEmail: [''],
      addPhone: ['', Validators.required],
      addMobilePhone: ['', Validators.required],
      addaddress1: ['', Validators.required],
      addaddress2: [''],
      addlandmark: ['', Validators.required],
      addcityName: ['', Validators.required],
      addstateId: ['1479'],
    //  addcountryId: ['', Validators.required],
      addzipCode: ['',  [Validators.required, Validators.minLength(6)]],
    });

  }
  ngOnInit(): void {
    if(this.checkoutaddress)
    {
      this.isCheckout=true;
      this.selectedaddress=this.selectedAddressId
    }
    this.getAddressByCustomerId();
    

  }
  selectAdd(e:any)
  {

this.selectedaddress=e.addressId;

this.sendAddId.emit(e)
  }

  onaddCountryChange(eve: any) {
    const selectedValue = eve.target.value;
    console.log(eve.target.value)
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

    this.getState(1);
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
   // this.getCity(selectedValue)
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }


  onAddSubmit() {
    this.addsubmitted=true;
if(this.adduserForm.valid)
{
    
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
        "countryId":1,
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
  else{
    this.validateAllFormFields(this.adduserForm);
  }

  }



  onSubmit() {
this.submitted=true;
    if(this.userForm.valid)
    {

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
        "countryId": 1,
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
  }

  onOptionChange(e:any)
  {
console.log(e.target.value)
this.deliverAddress= this.filterAddressesByAddressId(e.target.value);
console.log(this.deliverAddress)
  }

  getAddressByCustomerId() {
    let data = { "customerId": this.custID }
    this._crud.getAddressByCustomerId(data).subscribe(res => {
      this.originalAddress=res;
      this.deliverAddress = res;



    });
  }
  addNewAddress() {

    this.stateList = [];
    this.countryList = [];
    this.cityList=[];
   // this.getCountry();
    //this.getState(1)
    this.getCity();
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
          countryId: 1,
          zipCode: res.zipCode

        }
      );

      
    //  this.getCountry();
    //  this.getState(1);

this.getCity()


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

  getCity() {
    let data = {
      // stateId: id
    }
    this._crud.getDeliveryCity(data).subscribe(res => {
      
      this.cityList = res;
    });
  }





  deleteAddress(addId: any, custId: any) {
  
    Swal.fire({
      width:'350px',
   // imageUrl: '../../assets/images/tick.png',
    imageHeight: 80,
    text: 'Do you want to delete the Address',  
    showCancelButton: true,
    confirmButtonText:'Okay'
  }).then((result) => {
    if (result.isConfirmed) {
    
  
  
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
  });


  }


  // filterAddressesByAddressId(addressIdToFilter: any) {
  //   return this.originalAddress.filter((address: { addressId: any; }) =>
  //    {
    
  //     address.addressId == addressIdToFilter
  //    }
     
  //    );
  // }

  filterAddressesByAddressId(addressIdToFilter: any) {
    
    if(addressIdToFilter == 'all')
    {
      
return this.originalAddress
    }
    else
    {
      
    return this.originalAddress.filter((address: { addressId: any; }) => {
      return address.addressId === parseInt(addressIdToFilter);
    });
  }
  }



}
