import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  cityname:any;
  type:any;
  PageName:any;
  showproductDetails:any;
  constructor ( private route:ActivatedRoute)
  {
  
  this.getPageRoutes();
  }

  
  getPageRoutes()
  {
    this.route.params.subscribe((params) => {
      this.cityname = params['cityname']; 
    let typeName=params['type']
    //  this.type = params['type']; 


      if(typeName == 'cakes')
      {
        this.type='C';
        this.showproductDetails=false;
      } else if(typeName=='best-sellers-cakes-online')
      {
        this.type='SC';
        this.showproductDetails=false;
      }
      else if(typeName=='birthday-gifts-online')
      {
        this.type='OCC';
        this.showproductDetails=false;
      }
      else if(typeName=='same-day-gifts')
      {
        this.type='SPL';
        this.showproductDetails=false;
      }
      else if(typeName=='almond')
      {
        this.type='FLV';
        this.showproductDetails=false;
      }
      else if(typeName=='cakes')
      {
        this.type='SE'
        this.showproductDetails=false;
      }
      else if(typeName=='send-online')
      {
        this.type='send-online';
        this.showproductDetails=true;
      }
      else
      {
        this.type=typeName;
        console.log('yes')
        if(this.cityname == 'send-online')
        {
          console.log('prod')
          this.showproductDetails=true}
          else
          {
            console.log('nopro')
        this.showproductDetails=false;
          }
      }

      
     this.PageName = params['PageName']; 
    });
  }

}
