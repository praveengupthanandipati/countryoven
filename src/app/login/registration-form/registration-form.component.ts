
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { CurdService } from 'src/app/services/curd.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
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
  msgstatus:boolean=false;
  msg:any;
  orderlogin:boolean=false;
  giftslogin:boolean=false;
  constructor( private renderer:Renderer2,  private router:Router, private route:ActivatedRoute, private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private cookieService: CookieService){
    this.sessionId= this.cookieService.get('sessionID');
    this.userForm = this.fb.group({
      usrname: ['', [Validators.required, Validators.minLength(3)]],
      useremail: ['', [Validators.required, Validators.email]],
      userphone: ['',  [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
    });
  }
  ngOnInit() {
    
  const queryParams = this.route.snapshot.queryParams;
  if(queryParams['arg'] =='ck')
  {
    this.orderlogin=true;
  }
  else if(queryParams['arg'] =='cg')
{
  this.giftslogin=true;
}

  else
  {
    this.orderlogin=false;
    this.giftslogin=false;
  }
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
  
  this.addLoader();
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
    this.removeLoader()
  //  this.toastr.error(res.errorMessage);
    this.msg=res.errorMessage;
    this.msgstatus=true;
    setTimeout(() => {
    //  this.msgstatus=false;
    }, 5000);
  }
  else
  {
    this.msgstatus=true;
   // this.toastr.success(res.successMessage);
    this.login();
  }
        });
}



login()
{
  
let data={
 
  
  
    "customerEmail": this.userForm.get('useremail').value,
    "password":"" +  this.userForm.get('userphone').value  + "",
    "sessionId":this.sessionId
 
 
  }

  this._crud.login(data).subscribe(res => {
    
  if(res.isEroor)
  {
   this.removeLoader();
    
    
  }
  else
  {
  //  this.toastr.success(res.successMessage);
    localStorage.setItem('email', this.userForm.get('usrname').value)
    localStorage.setItem('customerId', res.customerId);
    localStorage.setItem('custName', res.customerName);
  
    if(this.orderlogin)
    {
      this.router.navigateByUrl('/checkout')
    }
    else if(this.giftslogin)
    {
      this.router.navigateByUrl('/customgifts')
    }
   else
   {
    this.router.navigateByUrl('/')
   }
   // this.router.navigateByUrl('/')
    this.removeLoader();
  }
        });
}


addLoader()
{
  this.renderer.addClass(document.body, 'bodyloader');
}
removeLoader()
{
  this.renderer.removeClass(document.body, 'bodyloader');
}

}
