import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-customized-cakes',
  templateUrl: './customized-cakes.component.html',
  styleUrls: ['./customized-cakes.component.scss']
})
export class CustomizedCakesComponent {
  form!: FormGroup;
  selectedFile: any;
  binaryData: any;
  constructor(
    private toastr: ToastrService,
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


  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
      }

  submit(formVal:any)
  {
    

   


    let obj = {
        customizedCakeDetails: 
        {
          "name": this.form.get('name')?.value,
          "mobile":  this.form.get('mobile')?.value,
          "email": this.form.get('email')?.value,
          "comments": this.form.get('comments')?.value,
          "date":new Date()
        //  "CustomizedCakeDetails.imagePath": this.binaryData
         
        }
        
    }
   
     
    this._crud.postcustomize(obj).subscribe(res => {
     
     console.log(res)
     


let cuId=res.id;



    
   let fd = formVal.value;

   let formData = new FormData();
 formData.append('ImagePath', this.selectedFile); 
   formData.append('Id', cuId);
 
  this._crud.uploadCake(formData).subscribe(res => {
   
   console.log(res)

   if(res.isEroor)
   {
     
     this.toastr.error('Unable to proceed');
   }
   else
   {
     this.toastr.success('Your request submit sucessfuly. we will get back to you');
     this.form.reset()
   }
   
  })










    })
  }
}
