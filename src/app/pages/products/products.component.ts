import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  cityname: any;
  type: any;
  PageName: any;
  showproductDetails: any;
  typeName: any;
  constructor(private route: ActivatedRoute) {

    this.getPageRoutes();
  }


  getPageRoutes() {
    this.route.params.subscribe((params) => {
    
    if(params['cityname'] =='send-online')
    {
      this.showproductDetails = true
    }
else
{
      if (params['favspl']) {

        let urlparms = params['favspl'].split('-to-');

        if (urlparms.length > 1) {

          this.typeName = 'FLV';
          this.cityname = urlparms[1];
        }
        else {

          let urlparms1 = params['favspl'].split('-');

          this.cityname = urlparms1[urlparms1.length - 1]
          this.typeName = 'SPL';

        }
        this.showproductDetails = false;
      }
      else if (params['cityname1']) {
        this.showproductDetails = false;
        this.typeName = 'CTY';


      }
      else if (params['type']) {
        this.cityname = params['cityname'];
        this.typeName = params['type']
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
    });
  }

}
