import { Component } from '@angular/core';
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
constructor(private toastr: ToastrService,private fb: FormBuilder, private _crud:CurdService, private route:Router)
{
  this.userForm = this.fb.group({
    usrname: ['', Validators.required],
    
    
  });
}





onSubmit()
  {
    
  let data={
    "customerEmail": this.userForm.get('usrname').value,
    }
  
    this._crud.forgotpwd(data).subscribe(res => {
      
    if(res.isEroor)
    {
      
      this.toastr.error(res.errorMessage);
    }
    else
    {
      this.toastr.success(res.successMessage);
      this.route.navigateByUrl('/login')
    }
          });
  }
}
