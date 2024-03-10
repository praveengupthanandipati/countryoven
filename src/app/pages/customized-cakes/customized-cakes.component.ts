import { Component, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  form: any;
  selectedFile: any;
  binaryData: any;
  submitted: any;
  msg: any;
  msgStatus: boolean = false;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private meta: Meta, private title: Title,
    private _crud: CurdService, private route: ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router: Router) {

      
        this.title.setTitle('Customize a Cake | Country Oven');
        this.meta.updateTag({ name: 'description',  content: 'Country Oven offers customized cakes in Hyderabad! We prepare cakes as per your requirement. Order cartoon cakes and Chota Bheem cake in india now!' });
        this.meta.updateTag({ name: 'keywords',  content: 'cakes in Hyderabad, cakes in India, customize cakes, customized cakes, customize a cake' });
        this.meta.updateTag({ name: 'classification',  content: 'Country Oven - Country Oven offers customized cakes in Hyderabad! We prepare cakes as per your requirement. Order cartoon cakes and Chota Bheem cake in india now!' });
      
      

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],

      mobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],

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

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = event.target.files[0];

    if (file && allowedTypes.includes(file.type)) {
      // File is valid, you can update the form control value
      this.selectedFile = event.target.files[0];
    } else {
      // Reset the form control and show an error message

      
    }



  }

  submit(formVal: any) {
    this.submitted = true;


    if (this.form.valid) {

      this.addLoader();


      let obj = {
        customizedCakeDetails:
        {
          "name": this.form.get('name')?.value,
          "mobile": this.form.get('mobile')?.value.toString(),
          "email": this.form.get('email')?.value,
          "comments": this.form.get('comments')?.value,
          "date": new Date()
          //  "CustomizedCakeDetails.imagePath": this.binaryData

        }

      }


      this._crud.postcustomize(obj).subscribe(res => {

        
        this.msgStatus = true;
        let cuId = res.id;
        let fd = formVal.value;
        let formData = new FormData();
        formData.append('ImagePath', this.selectedFile);
        formData.append('Id', cuId);
        this._crud.uploadCake(formData).subscribe(res => {
          this.removeLoader();
          if (res.isEroor) {
            this.toastr.error('Unable to proceed');
          }
          else {
            this.toastr.success('Your request submit sucessfuly. we will get back to you');
            this.form.reset();
            this.submitted = false;
          }

        })

      })
    }
  }


  addLoader() {
    this.renderer.addClass(document.body, 'bodyloader');
  }
  removeLoader() {
    this.renderer.removeClass(document.body, 'bodyloader');
  }
}
