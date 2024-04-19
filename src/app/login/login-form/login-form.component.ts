import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
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
  giftslogin: boolean = false;
  reviewlogin: boolean = false;
  submitted = false;
  errorMsg:any;
  errorMsgstatus:boolean=false;
  constructor(private titleService:Title, private meta:Meta,private renderer:Renderer2,  private route:ActivatedRoute,  private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private cookieService: CookieService, private router:Router){
 
    this.titleService.setTitle("Countryoven's - Sign in or Sign up");
    this.meta.updateTag({ name: 'description',  content: "Birthday Cakes to Hyderabad,midnight cake delivery in hyderabad, Cakes to vizag,Designer cakes to Hyderabad,Birthday Cakes to India same day delivery,Flowers to Hyderabad, Sweets to Hyderabad, Gifts to Hyderabad,Cakes to Delhi,Cakes to Bangalore, Cakes to Chennai." });
    this.meta.updateTag({ name: 'keywords',  content: "Gifts to Hyderabad, Gifts to Vizag, Cakes to Hyderabad, Chocolates to Hyderabad, Flowers to Hyderabad,  Flowers to Vizag, Cakes to Vizag, Sweets to Hyderabad.." });
    this.meta.updateTag({ name: 'classification',  content: "Gifts to Hyderabad, Flowers, Flowers to Hyderabad,Send Flowers to Hyderabad, Gifts, Gifts to Hyderabad, Send Gifts to Hyderabad, Flowers delivery in Hyderabad, Gifts delivery in Hyderabad,to send gifts to india,Flower Bouquet in Hyderabad, Online Florists, Online Florists in Hyderabad, Hyderabad Online Florists, Cakes, Cake , Cakes to Hyderabad, Sweets, Sweets to Hyderabad, Chocolates,Chocolates to Hyderabad, Watches, Watches to Hyderabad, Leather Bags to Hyderabad, Leather Items to Hyderabad." });
  
 
 
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
  else if (queryParams['arg'] == 're') {
    this.reviewlogin = true;
  }
  else  if(queryParams['arg'] =='cg')
  {
    this.giftslogin=true;
  } else
  {
    this.orderlogin=false;
    this.giftslogin = false;
    this.reviewlogin = false;
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
    // setTimeout(() => {
    //   this.errorMsgstatus=false;
    // }, 4000);
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
    else if (this.reviewlogin) {
      this.router.navigateByUrl('/myaccount/orders')
    }
    else if(this.giftslogin)
    {
      this.router.navigateByUrl('/customgifts')
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

gotosignup()
{
 if(this.orderlogin)
 {
  this.router.navigateByUrl('/signup?arg=ck')
 }
 else if(this.giftslogin)
 {
  this.router.navigateByUrl('/signup?arg=cg')
 }
 else{
 
  this.router.navigateByUrl('/signup')
 }
}


onInputChange() {
  this.errorMsgstatus=false
      // this.maxLength = 40 - this.textAreaInput.length;
     
    }

}

