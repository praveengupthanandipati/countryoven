import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
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
  constructor(
    private meta: Meta, private title: Title,
    private renderer:Renderer2, private fb: FormBuilder, private _crud:CurdService, private route:Router)
  {

    this.title.setTitle('Corporate Orders | Business Promotional Cakes In India CountryOven');
    this.meta.updateTag({ name: 'description',  content: 'Looking for Best Business Promotional Cakes In India CountryOven ? Here at Ferns N Petals, We offer the best Promotional Combos, Confectionery, and Snacks.' });
    this.meta.updateTag({ name: 'keywords',  content: 'cakes in Hyderabad, cakes in India, customize cakes, customized cakes, customize a cake' });
    this.meta.updateTag({ name: 'classification',  content: 'Country Oven - CorporateOrders' });
  
  

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
   
   this.msg=res.successMessage;
   this.msgstatus=true;
   
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
