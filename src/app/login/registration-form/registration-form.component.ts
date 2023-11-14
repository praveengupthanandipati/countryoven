
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { CurdService } from 'src/app/services/curd.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  sessionId:any;
  userForm: any;
  userIp:any;
  constructor(private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private cookieService: CookieService){
    this.sessionId= this.cookieService.get('sessionID');
    this.userForm = this.fb.group({
      usrname: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      userphone: ['', Validators.required],
    });
  }
  ngOnInit() {
    this._crud.getIpAddress().subscribe((data: any) => {
     this.userIp = data.ip;
      console.log('User IP:', data.ip);
    });
  }
 

  onSubmit()
  {
    if(this.userForm.valid)
    {
      console.log(this.userForm.get('usrname').value)
      this.register();
    }
  //  console.log(this.userForm.valid)
    //console.log(this.userForm.value);
  }
register()
{
  
let data={
 
  customerDetails: {
    customerFirstName: this.userForm.get('usrname').value,
    primaryEmail: this.userForm.get('useremail').value,
    customerIp: this.userIp,
    phoneNo: "" +  this.userForm.get('userphone').value  + "",
    sessionId:this.sessionId
  }
 
 
  }

  this._crud.createCustomer(data).subscribe(res => {
    console.log(res)
  if(res.isEroor)
  {
    
    this.toastr.error(res.errorMessage);
  }
  else
  {
    this.toastr.success(res.successMessage);
  }
        });
}
}
