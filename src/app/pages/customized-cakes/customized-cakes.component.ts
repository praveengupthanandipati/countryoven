import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-customized-cakes',
  templateUrl: './customized-cakes.component.html',
  styleUrls: ['./customized-cakes.component.scss']
})
export class CustomizedCakesComponent {
  form!: FormGroup;
  constructor(
    private meta: Meta, private title:Title,
    private _crud:CurdService, private route:ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router:Router)
  {
    
    

    this.form = this.fb.group({
      
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      comments: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  submit()
  {
    let obj = {
        customizedCakeDetails: [
        {
          "CustomizedCakeDetails.name": this.form.get('name')?.value,
          "CustomizedCakeDetails.mobile": this.form.get('mobile')?.value,
          "CustomizedCakeDetails.email": this.form.get('email')?.value,
          "CustomizedCakeDetails.comments": this.form.get('comments')?.value,
          "CustomizedCakeDetails.image": this.form.get('image')?.value,
         
        }
        ]
    }
   
    this._crud.postcustomize(obj).subscribe(res => {
     console.log(res)
     
     
    })
  }
}
