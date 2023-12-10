import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  constructor(private route: Router)
  {

  }
  @Input('iconicBanners') iconicBanners:any;
  categories=[
    {name: 'CAKES', image:'assets/images/categories/cakes.svg'},
    {name: 'FLOWERS', image:'assets/images/categories/flowers.svg'},
    {name: 'GIFTS', image:'assets/images/categories/gifts.svg'},
    {name: 'SAME DAY GIFTS', image:'assets/images/categories/samedaygifts.svg'},
    {name: 'BIRTHDAY GIFTS', image:'assets/images/categories/birthdaygifts.svg'},
    {name: 'COMBOS GIFTS', image:'assets/images/categories/combosgifts.svg'},
    {name: 'CAKES LOVED', image:'assets/images/categories/cakesloved.svg'},
    {name: 'ANNIVERSARY GIFTS', image:'assets/images/categories/anniversarygifts.svg'},
  ]




  gotoroute( t:any, pname:any)
  {
  
  let c=localStorage.getItem('city')   
  
  
    if(t == 'C')
    {
      t='online-delivery';
      this.route.navigateByUrl('/'+ pname + '/'+ c + '/' + t )
      
    } else if(t=='SC')
    {
      t='order';
      this.route.navigateByUrl('/'+ t + '/'+ c + '/' + pname)
    }
    else if(t=='OCC')
    {
      t='send';
      this.route.navigateByUrl('/'+ t + '/'+ c + '/' + pname)
    }
    else if(t=='SPL')
    {
    
      this.route.navigateByUrl('/'+ pname +'-' + c)
    }
    else if(t=='FLV')
    {
      
      let link=pname + '-to-' +c
      this.route.navigateByUrl('/'+ link)
    }
    else if(t=='CTY')
    {
      this.route.navigateByUrl('/'+c +'/'+pname)
    }
    
    else
    {
      t=t
    }
  
  
  }






}
