import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  userForm:any;
  submitted:boolean=false;
  errmsgstatus:boolean=false;
  sucessmsgstatus:boolean=false;
  msg:any;
  
constructor(private renderer:Renderer2,  private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private route:Router)
{
  this.userForm = this.fb.group({
    usrname: ['',[Validators.required, Validators.email]],
    
    
  });
}





onSubmit()
  {
    this.errmsgstatus=false;
    this.sucessmsgstatus=false;
    this.submitted=true
    if(this.userForm.valid)
    {
      this.addLoader();
  let data={
    "customerEmail": this.userForm.get('usrname').value,
    }
  
    this._crud.forgotpwd(data).subscribe(res => {
      this.removeLoader()
    if(res.isEroor)
    {
      this.msg=res.errorMessage;
      this.errmsgstatus=true;
      setTimeout(() => {
        this.errmsgstatus=false;  
        }, 4000);
      this.toastr.error(res.errorMessage);
    }
    else
    {
      this.msg=res.successMessage;
      this.sucessmsgstatus=true;
      setTimeout(() => {
       // this.sucessmsgstatus=false
      }, 5000);
   //   this.toastr.success(res.successMessage);
   //   this.route.navigateByUrl('/login')
      // setTimeout(() => {
      // this.sucessmsgstatus=false;  
      // }, 4000);
    }
          });
  }

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
