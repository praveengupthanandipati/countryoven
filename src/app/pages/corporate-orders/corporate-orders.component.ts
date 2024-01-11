import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-corporate-orders',
  templateUrl: './corporate-orders.component.html',
  styleUrls: ['./corporate-orders.component.scss']
})
export class CorporateOrdersComponent implements OnInit {
  userForm:any;
  submitted:boolean=false;
  msg:any;
  msgstatus:boolean=false;
  constructor(private renderer:Renderer2, private fb: FormBuilder, private _crud:CurdService, private route:Router)
  {


    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      emailId:  ['', [Validators.required, Validators.email]],
            mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]], 
      companyName:  ['', Validators.required],
      comments:  [''],
     
  
    });

  }
  ngOnInit(): void {
 
  }




  onSubmit()
{
this.submitted=true
  if(this.userForm.valid)
  {
this.addLoader();
  
  let data={
      "corporateOrdersDetails": {
        "name": this.userForm.get('name').value,
        "emailId": this.userForm.get('emailId').value,
        "mobileNo": this.userForm.get('mobileNo').value.toString(),
        "companyName": this.userForm.get('companyName').value,
        "comments": this.userForm.get('comments').value
        
      }
    
 }
  this._crud.corporateOrders(data).subscribe(res => {
   console.log(res) 
   this.msg=res.successMessage;
   this.msgstatus=true;
   console.log(this.msgstatus);
   this.removeLoader();
   setTimeout(() => {
    this.msgstatus=false
   }, 5000);
  if(!res.isEroor)
  {
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
