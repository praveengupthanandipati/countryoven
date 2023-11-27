import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  sessionId:any;
  userForm: any;
  orderlogin:boolean=false;
  constructor(private route:ActivatedRoute,  private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private cookieService: CookieService, private router:Router){
    this.sessionId= this.cookieService.get('sessionID');
    this.userForm = this.fb.group({
      usrname: ['', Validators.required],
      pwd: ['', [Validators.required]],
      
    });
  }
  ngOnInit() {
  

  const queryParams = this.route.snapshot.queryParams;
  if(queryParams['arg'] =='ck')
  {
    this.orderlogin=true;
  }
  else
  {
    this.orderlogin=false;
  }
console.log(this.orderlogin)
  }

  onSubmit()
  {
    if(this.userForm.valid)
    {
      console.log(this.userForm.get('usrname').value)
      this.login();
    }
  //  console.log(this.userForm.valid)
    //console.log(this.userForm.value);
  }
  login()
{
  
let data={
 
  
  
    "customerEmail": this.userForm.get('usrname').value,
    "password":this.userForm.get('pwd').value,
    "sessionId":this.sessionId
 
 
  }

  this._crud.login(data).subscribe(res => {
    console.log(res)
  if(res.isEroor)
  {
    
    this.toastr.error(res.errorMessage);
  }
  else
  {
    this.toastr.success(res.successMessage);
    localStorage.setItem('email', this.userForm.get('usrname').value)
    localStorage.setItem('customerId', res.customerId);
    localStorage.setItem('custName', res.customerName);
    if(this.orderlogin)
    {
      this.router.navigateByUrl('/checkout')
    }
   else
   {
    this.router.navigateByUrl('/')
   }
  }
        });
}
}

