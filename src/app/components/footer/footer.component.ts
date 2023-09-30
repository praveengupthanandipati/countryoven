import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit{
  footerlinks:any;
constructor(private _crud:CurdService)
{

}
  ngOnInit() {
  this.getFooters()
  }


getFooters(): void {
     
      
  this._crud.getFooters().subscribe(res => {
   console.log(res)
   this.footerlinks=res;
  })
}
}
