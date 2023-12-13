import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.scss']
})
export class HomeComponent implements OnInit{
  banners:any;
  iconicBanners:any;
  smallBanners:any;
  productSecions: any;
  city:any;
  countryname:any;
  currency:any;
   showLines: number = 3;

  showMore() {
    this.showLines += 3; // Increase by desired number of lines
  }
  constructor(private _crud:CurdService, private route:Router,  private renderer: Renderer2)
  {
  
  }

  addLoader()
  {
    this.renderer.addClass(document.body, 'bodyloader');
  }
  removeLoader()
  {
    this.renderer.removeClass(document.body, 'bodyloader');
  }

  ngOnInit(): void {
this.addLoader();
localStorage.setItem('country', 'India')
//localStorage.setItem('currency', 'INR')


this.city=localStorage.getItem('city')
this.countryname=localStorage.getItem('country');
this.currency=localStorage.getItem('currency');



    this.getBanners()
    this.getProducts();
  }
 

  getBanners(): void {
    this.addLoader();
    this._crud.getBanners().subscribe(res => {
     this.removeLoader();
     this.banners=res.banners;
    this.iconicBanners=res.iconicBanners;
    this.smallBanners=res.smallBanners;
    })
  }


  
  getProducts(): void {
    this.addLoader();
    const data={
      cityname:this.city,
      country:this.countryname,
      currencySelected:this.currency
    }    
    this._crud.getProducts(data).subscribe(res => {
     this.removeLoader();
     this.productSecions=res
    })
  }



  gotoroute( t:any, pname:any)
  {
  
  let c=localStorage.getItem('city')   
  
  
    if(t == 'C')
    {
      t='online-delivery';
      this.route.navigateByUrl('/'+ t + '/'+ c + '/' + pname)
      
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
