import { Component, Renderer2 } from '@angular/core';
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
  submitted = false;
  errorMsg:any;
  errorMsgstatus:boolean=false;
  constructor(private renderer:Renderer2,  private route:ActivatedRoute,  private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private cookieService: CookieService, private router:Router){
    this.sessionId= this.cookieService.get('sessionID');
    this.userForm = this.fb.group({
      usrname: ['', [Validators.required, Validators.email]],
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

  }

  onSubmit()
  {
    this.submitted=true;
    if(this.userForm.valid)
    {
      
      this.login();
    }
  
  }
  login()
{
  this.addLoader();
let data={
 
    "customerEmail": this.userForm.get('usrname').value,
    "password":this.userForm.get('pwd').value,
    "sessionId":this.sessionId
 
 
  }

  this._crud.login(data).subscribe(res => {
    this.removeLoader();
  if(res.isEroor)
  {
    this.errorMsgstatus=true;
    this.errorMsg=res.errorMessage;
    setTimeout(() => {
      this.errorMsgstatus=false;
    }, 4000);
    this.toastr.error(res.errorMessage);
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
   else
   {
    this.router.navigateByUrl('/')
   }
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

