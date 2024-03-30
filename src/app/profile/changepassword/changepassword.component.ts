import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  userForm:any;
  custName: any;
  error:boolean=false;
  errormsg:any;
  cpwd:any;
  constructor(  private meta: Meta, private title: Title,private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private route:Router)
  {

    this.title.setTitle("Countryoven's - Change Password");
    this.meta.updateTag({ name: 'description',  content: "Countryoven's - Change Password" });
    this.meta.updateTag({ name: 'keywords',  content:"Countryoven's - Change Password"  });
    this.meta.updateTag({ name: 'classification',  content: "Countryoven's - Change Password"});
  
  
    if (localStorage.getItem('email')) {
    
      this.custName = localStorage.getItem('custName')
    }



    this.userForm = this.fb.group({
   
      oldPassword: ['', Validators.required],
      newPassword:  ['', Validators.required],
      confirmPassword:  ['', Validators.required]
    }, { validator: passwordMatchValidator });
  }
  
  
  
  onInputChange() {
this.error=false
    // this.maxLength = 40 - this.textAreaInput.length;
   
  }
  
  onSubmit()
    {
      this.error=false
      
    let data={
      "customerEmail": localStorage.getItem('email'),
      "oldPassword":this.userForm.get('oldPassword').value,
      "newPassword":this.userForm.get('newPassword').value
      }
    
      this._crud.changePassword(data).subscribe(res => {
        
      if(res.isEroor)
      {
        
      //  this.toastr.error(res.errorMessage);
        this.errormsg=res.errorMessage;
        this.error=true;
      }
      else
      {
        this.toastr.success(res.successMessage);
        //this.route.navigateByUrl('/login')
      }
            });
    }
}
 
function passwordMatchValidator(form: FormGroup) {
  const newPassword = form.get('newPassword');
  const confirmPassword = form.get('confirmPassword');

  if (newPassword?.value !== confirmPassword?.value) {
    confirmPassword?.setErrors({ passwordMatch: true });
  } else {
    confirmPassword?.setErrors(null);
  }
}