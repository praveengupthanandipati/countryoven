import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-banners',
  templateUrl: './category-banners.component.html',
  styleUrls: ['./category-banners.component.scss']
})
export class CategoryBannersComponent implements OnInit {
  @Input('smallBanners') smallBanners:any;

  constructor(private route:Router){
    
  }
  ngOnInit(): void {
    
  }



  gotoroute( t:any, pname:any)
  {
  
  let c=localStorage.getItem('city')?.toLowerCase();   
  
  
    if(t == 'C')
    {
      t='online-delivery';
      // this.route.navigateByUrl('/'+ t + '/'+ c + '/' + pname)
      this.route.navigateByUrl('/'+ pname + '/'+ c + '/' + t) 
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
      // t=t
    }
  
  
  }


}
