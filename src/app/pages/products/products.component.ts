import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CurdService } from 'src/app/services/curd.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  cityname: any;
  type: any;
  PageName: any;
  showproductDetails: boolean = true;
  typeName: any;
  getCountryStatus:boolean=false
  constructor( private _crud:CurdService, private route: ActivatedRoute, private router: Router, private location: Location) {

  this.getPageRoutes();
   this.setcounntry();
this.getCountryStatus= localStorage.getItem('country') ? true : false;
console.log(this.getCountryStatus)

  }

setcounntry()
{

  if(!localStorage.getItem('country') || !localStorage.getItem('currency'))
      {
        this._crud.getCountryusingIp().subscribe((data: any) => {
    if(!localStorage.getItem('country'))
    {
      localStorage.setItem('country', data.country)
    }
  
    if(localStorage.getItem('country') == 'India')
    {
      if(!localStorage.getItem('currency'))
      {      
      localStorage.setItem('currency', 'INR')
      }
    }
    else
    {
      if(!localStorage.getItem('currency'))
      {      
      localStorage.setItem('currency', 'USD')
      }
    }
    this.getCountryStatus= localStorage.getItem('country') ? true : false;
  
  });
      } 



}


  getPageRoutes() {
    this.route.params.subscribe((params) => {
      console.log(params);

      if(params['favspl'] == 'sitemap.xml')
      {
        console.log('hi')
        window.location.reload();
      }

      if (params['cityname'] == 'send-online') {
        this.showproductDetails = true
        let getOldUrl = this.router.url;
        let city: any;
        if (!localStorage.getItem('city')) {
          localStorage.setItem('city', params['type'])
        }
        city = localStorage.getItem('city');
        let newurl = getOldUrl.replace(params['type'], city.toLowerCase());
        this.location.replaceState(newurl);
      }
      /* start else */
      else {
        this.showproductDetails = false;
        if (params['favspl']) {
          let urlparms = params['favspl'].split('-to-');
          if (urlparms.length > 1) {
            this.typeName = 'FLV';
            this.cityname = urlparms[1];
            if (!localStorage.getItem('city')) {
              localStorage.setItem('city', this.cityname)
            }
          }
          else {
            let urlparms1 = params['favspl'].split('-');
            this.cityname = urlparms1[urlparms1.length - 1]
            this.typeName = 'SPL';
            if (!localStorage.getItem('city')) {
              localStorage.setItem('city', this.cityname)
            }
          }
          this.showproductDetails = false;
        }
        else if (params['cityname1']) {
          if (!localStorage.getItem('city')) {
            localStorage.setItem('city', params['cityname1'])
          }
          this.showproductDetails = false;
          this.typeName = 'CTY';
        }
        else if (params['type']) {
          if (params['PageName'] == 'online-delivery') {
            this.cityname = params['cityname'];
            this.typeName = params['PageName']
            if (!localStorage.getItem('city')) {
              localStorage.setItem('city', params['cityname'])
            }
          }
          else {
            if(params['type'] =='search_result')
            {
              this.cityname = params['PageName'];
              this.typeName = params['type']
              if (!localStorage.getItem('city')) {
                localStorage.setItem('city', params['PageName'])
              }
            } 
            else
            {
              this.cityname = params['cityname'];
              this.typeName = params['type'];
              if (!localStorage.getItem('city')) {
                localStorage.setItem('city', params['cityname'])
              }
            }
            
           
            
          }


        }
        else {

        }


        if (this.typeName == 'online-delivery') {
          this.type = 'C';
          this.showproductDetails = false;
        } else if (this.typeName == 'order') {
          this.type = 'SC';
          this.showproductDetails = false;
        }
        else if (this.typeName == 'send') {
          this.type = 'OCC';
          this.showproductDetails = false;
        }

        else if (this.typeName == 'SPL') {
          this.type = 'SPL';
          this.showproductDetails = false;
        }

        else if (this.typeName == 'FLV') {
          this.type = 'FLV';
          this.showproductDetails = false;
        }
        else if (this.typeName == 'CTY') {
          this.type = 'CTY';
          this.showproductDetails = false;
        }
        else if (this.typeName == 'send-online') {
          this.type = 'send-online';
          this.showproductDetails = true;
        }
        else {
          this.type = this.typeName;
          if (this.cityname == 'send-online') {
            this.showproductDetails = true
          }
          else {
             this.showproductDetails = false;
          }
        }
         this.PageName = params['PageName'];
      }

      /* end else */
    });
  }

}
