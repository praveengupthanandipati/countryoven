import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit{
  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  footerlinks:any;
  form:any;

  showLinks: boolean = false;
  toggleLinks(m:any) {
    m.show =!m.show
    this.showLinks = !this.showLinks;
  }


constructor(private _crud:CurdService, private toastr: ToastrService, private fb:FormBuilder)
{
  this.form = this.fb.group({

    emailId: ['', [Validators.required, Validators.email]],
    
  });
}
  ngOnInit() {
  this.getFooters()
  }


getFooters(): void {    
  this._crud.getFooters().subscribe(res => {
 
   this.footerlinks=res;
  })
}


subscribe()
{
  let data = {
    "subscribeDetails": {
      "emailId": this.form.get('emailId').value,
      "subscribedOn":new Date(),
      "status": true
    }
  }
  this._crud.subscribe(data).subscribe(res => {
    if (!res.isEroor) {
      this.toastr.success(res.successMessage)
    
      this.form.get('emailId')!.setValue('')

    }
    else {
      this.toastr.error(res.errorMessage)
    }
   
  });
}
}



