
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
  submitted:boolean=false;
  constructor(private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private cookieService: CookieService){
    this.sessionId= this.cookieService.get('sessionID');
    this.userForm = this.fb.group({
      usrname: ['', [Validators.required, Validators.minLength(3)]],
      useremail: ['', [Validators.required, Validators.email]],
      userphone: ['', Validators.required],
    });
  }
  ngOnInit() {
    this._crud.getIpAddress().subscribe((data: any) => {
     this.userIp = data.ip;
      
    });
  }
 

  onSubmit()
  {
    this.submitted=true;
    if(this.userForm.valid)
    {
      
      this.register();
    }
  
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
