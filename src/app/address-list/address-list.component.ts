import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
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
  originalAddress: any;
  isLogend: boolean = false;
  email: any;
  custID: any;
  custName: any;
  userForm: any;
  adduserForm: any;
  countryList: any;
  stateList: any;
  selectedaddress: any = 'select';
  selectedAddressData: any;
  addressId: any;
  submitted: boolean = false;
  addsubmitted: boolean = false;
  maxAddressLength = 100;
  cityname: any;
  notmatch: boolean = false;
  notmatchzip:boolean=false;
  textAreaInput = '';
  customaddressObj:any;
  @ViewChild('AddButton')
  AddButton!: ElementRef;


  @ViewChild('EditButton')
  EditButton!: ElementRef;
  cityList: any;

  @Input('checkoutaddress') checkoutaddress: boolean = false;
  @Input('selectedAddressId') selectedAddressId: any;
  @Input('zipcode') zipCode:string='no';
  @Output() sendAddId: any = new EventEmitter<any>();
  isCheckout: boolean = false;
  addressidobj: any = [];
  constructor(private titleService: Title, private meta: Meta, private renderer: Renderer2, private _crud: CurdService, private fb: FormBuilder, private el: ElementRef, private toastr: ToastrService) {

    this.titleService.setTitle("Countryoven's - Address Book");
    this.meta.updateTag({ name: 'description', content: "Countryoven's - Address Book" });
    this.meta.updateTag({ name: 'keywords', content: "Countryoven's - Address Book" });
    this.meta.updateTag({ name: 'classification', content: "Countryoven's - Address Book" });


    if (localStorage.getItem('email')) {
      this.isLogend = true;
      this.email = localStorage.getItem('email');
      this.custID = localStorage.getItem('customerId')
      this.custName = localStorage.getItem('custName')
    
    }
    this.cityname = localStorage.getItem('city')

    this.userForm = this.fb.group({
      recipientFirstName: ['', [Validators.required, Validators.minLength(3)]],
      recipientLastName: ['', [Validators.required]],
      email: [''],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      mobilePhone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      address1: ['', [Validators.required, Validators.maxLength(this.maxAddressLength)]],
      address2: [''],
      landmark: ['', Validators.required],
      cityName: [''],
      stateId: ['1479'],
      //  countryId: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });


    this.adduserForm = this.fb.group({
      addRecipientFirstName: ['', [Validators.required, Validators.minLength(3)]],
      addRecipientLastName: ['', [Validators.required]],
      addEmail: [''],
      addPhone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      addMobilePhone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      addaddress1: ['', [Validators.required, Validators.maxLength(this.maxAddressLength)]],
      addaddress2: [''],
      addlandmark: ['', Validators.required],
      addcityName: ['', Validators.required],
      addstateId: ['1479'],
      //  addcountryId: ['', Validators.required],
      addzipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
    
  }

  updateCharacterCount() {
    const addressControl = this.adduserForm.get('addaddress1');
    const currentLength = addressControl.value ? addressControl.value.length : 0;
    return currentLength;
  }

  editupdateCharacterCount() {
    const addressControl = this.userForm.get('address1');
    const currentLength = addressControl.value ? addressControl.value.length : 0;
    return currentLength;
  }

  ngOnInit(): void {
    
if(this.checkoutaddress)
    {
    this.adduserForm.get('addcityName')?.setValue(this.cityname);
    }

    if(this.checkoutaddress && this.zipCode !='no')
    {
    this.adduserForm.get('addzipCode')?.setValue(this.zipCode);
    }

    this.selectedaddress = 'select'
    this.getAddressByCustomerId();
  }
  selectAdd(e: any) {
    this.selectedaddress = e.addressId;

// (this.zipCode == 0 || this.zipCode == e.zipCode)  
    if ((this.cityname.toLowerCase() == e.cityName.toLowerCase())  && (this.zipCode == 'no' || this.zipCode == e.zipCode))  {
      let s: boolean = true
      this.sendAddId.emit({ e, s })
    }
    else {

if(this.cityname.toLowerCase() != e.cityName.toLowerCase())
{
  this.notmatch = true;

}
else
{
  this.notmatchzip = true;
}

      // if(this.zipCode != e.zipCode)
      // {
      //   this.notmatchzip = true;
      // }
      // else{
      //   this.notmatch = true;
      // }
      
      let s: boolean = false
      this.sendAddId.emit({ e, s })

    }

  }

  onaddCountryChange(eve: any) {
    const selectedValue = eve.target.value;

    this.stateList = [];
    this.cityList = [];

    this.userForm.patchValue(
      {
        cityName: '',
        stateId: ''
      }
    );
    this.adduserForm.patchValue(
      {
        cityName: '',
        stateId: ''
      }
    )

    this.getState(1);
  }
  onstateChange(eve: any) {
    const selectedValue = eve.target.value;

    this.cityList = [];
    this.userForm.patchValue(
      {
        cityName: '',

      }
    )
    this.adduserForm.patchValue(
      {
        cityName: '',

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
    this.addsubmitted = true;

    if (this.adduserForm.valid) {
      this.addLoader();
      let data = {

        "addressBookDetails": {
          "customerId": this.custID,
          "addressId": 0,
          "RecipientFirstName": this.adduserForm.value['addRecipientFirstName'],
          "RecipientLastName": this.adduserForm.value['addRecipientLastName'],
          "email": this.adduserForm.value['addEmail'],
          "Phone": this.adduserForm.value['addPhone'].toString(),
          "MobilePhone": this.adduserForm.value['addMobilePhone'].toString(),
          "address1": this.adduserForm.value['addaddress1'],
          "address2": this.adduserForm.value['addaddress2'],
          "landmark": this.adduserForm.value['addlandmark'],
          "cityName": this.adduserForm.value['addcityName'],
          "stateId": this.adduserForm.value['addstateId'],
          "countryId": 1,
        //  "zipCode": this.adduserForm.value['addzipCode'].toString(),
          "zipCode":  (this.checkoutaddress && this.zipCode !='no') ? this.zipCode.toString() : this.adduserForm.value['addzipCode'].toString(), 
          "relationshipId": 10,
          "status": true
        }
      }
      this._crud.addAddress(data).subscribe(res => {
        this.removeLoader();
        if (!res.isEroor) {

          
           if(this.checkoutaddress)
           {
         let e = { recipientFirstName: this.adduserForm.value['addRecipientFirstName'], recipientLastName: this.adduserForm.value['addRecipientLastName'], cityName:this.adduserForm.value['addcityName'], addressId: res.addressId, zipCode:this.adduserForm.value['addzipCode']  };

        let s:boolean=true
          this.sendAddId.emit({ e, s})  
           }


          this.toastr.success(res.successMessage);
          const button: HTMLButtonElement = this.AddButton.nativeElement;
          button.click();
          if(!this.checkoutaddress)
          {
          this.getAddressByCustomerId();
          }
          this.adduserForm.reset(); 
          this.addsubmitted = false;
        }
        else {
          this.toastr.error(res.errorMessage)
        }
      });
    }
    else {
      this.validateAllFormFields(this.adduserForm);
    }

  }



  onSubmit() {
    this.submitted = true;

    if (this.userForm.valid) {
      this.addLoader();
      let data = {
        "addressId": this.addressId,
        "addressBookDetails": {
          "recipientFirstName": this.userForm.value['recipientFirstName'],
          "recipientLastName": this.userForm.value['recipientLastName'],
          "email": this.userForm.value['email'],
          "phone": this.userForm.value['phone'].toString(),
          "mobilePhone": this.userForm.value['mobilePhone'].toString(),
          "address1": this.userForm.value['address1'],
          "address2": this.userForm.value['address2'],
          "landmark": this.userForm.value['landmark'],
          "cityName": this.checkoutaddress ? this.cityname : this.userForm.value['cityName'],
          "stateId": this.userForm.value['stateId'],
          "countryId": 1,
          "zipCode": (this.checkoutaddress && this.zipCode !='no') ? this.zipCode.toString() : this.userForm.value['zipCode'].toString(),
          "relationshipId": 10,
          "status": true

        }
      }


      this._crud.updateAddress(data).subscribe(res => {
        this.removeLoader();
        if (!res.isEroor) {
         

          this.toastr.success(res.successMessage)

          if(this.checkoutaddress)
          {
        let e = { recipientFirstName: this.userForm.value['recipientFirstName'], recipientLastName: this.userForm.value['recipientLastName'], cityName:this.cityname, addressId: res.addressId, zipCode:this.userForm.value['zipCode']  };

       let s:boolean=true
         this.sendAddId.emit({ e, s})  
          }


          const button: HTMLButtonElement = this.EditButton.nativeElement;
          button.click();
         
          if(!this.checkoutaddress)
          {
          this.getAddressByCustomerId();
          }
          this.submitted = false;
        }
        else {
          this.toastr.error(res.errorMessage)

        }
      });

    }
  }

  onOptionChange(e: any) {
    this.notmatch = false;
    this.notmatchzip = false;
    this.selectedAddressData = e.target.value;

    this.deliverAddress = this.filterAddressesByAddressId(e.target.value);
    
  }

  addressselected(e: any) {
    this.notmatch = false;
    this.notmatchzip=false;
    this.selectedAddressData = e;

    this.deliverAddress = this.filterAddressesByAddressId(e);
    
  }

  getAddressByCustomerId() {
    let data = { "customerId": this.custID }
    this._crud.getAddressByCustomerId(data).subscribe(res => {
      this.originalAddress = res;
      

      if (this.checkoutaddress) {
        this.isCheckout = true;
        this.selectedaddress = this.selectedAddressId
      }
      if (!this.checkoutaddress) {
        this.deliverAddress = res;
      }
      else if (this.originalAddress.length < 4) {
        this.deliverAddress = res;
      }
      else {
        this.deliverAddress = []
        if (this.checkoutaddress) {
          this.selectedaddress = this.selectedAddressId ? this.selectedAddressId : 'select'
          setTimeout(() => {
            this.addressselected(this.selectedaddress)
          }, 100);
        }
      }












      

    });
  }
  addNewAddress() {

    this.stateList = [];
    this.countryList = [];
    this.cityList = [];
    // this.getCountry();
    //this.getState(1)
    this.getCity();
  }
  editAddress(addId: any) {

    this.stateList = [];
    this.countryList = [];
    this.cityList = [];
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
      width: '350px',
      // imageUrl: '../../assets/images/tick.png',
      imageHeight: 80,
      text: 'Do you want to delete the Address',
      showCancelButton: true,
      confirmButtonText: 'Okay'
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



  filterAddressesByAddressId(addressIdToFilter: any) {

    if (addressIdToFilter == 'all') {

      return this.originalAddress
    }
    else {

      return this.originalAddress?.filter((address: { addressId: any; }) => {
        return address.addressId === parseInt(addressIdToFilter);
      });
    }
  }

  addLoader() {
    this.renderer.addClass(document.body, 'bodyloader');
  }
  removeLoader() {
    this.renderer.removeClass(document.body, 'bodyloader');
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
