import { Component, OnInit, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  constructor(private _crud:CurdService, private route:Router,  private renderer: Renderer2,  private meta:Meta, private titleService:Title)
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
    this.titleService.setTitle('Order Cake Online | Send Cake Online to India - Country Oven');
    this.meta.updateTag({ name: 'description',  content: 'Online cake delivery - Through Country Oven, order a cake online to surprise your beloved ones. Send a cake to India with same-day delivery from anywhere with just one click. Order now!' });
    this.meta.updateTag({ name: 'keywords',  content: 'keywords" content="Order Birthday Cake Online ,order cake online ,birthday cakes delivered ,send cake to India ,online cake delivery in india ,send birthday cake online' });
    this.meta.updateTag({ name: 'classification',  content: 'Order Birthday Cake Online ,order cake online ,birthday cakes delivered ,send cake to India ,online cake delivery in india ,send birthday cake online' });

this.addLoader();

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

let c=localStorage.getItem('city')?.toLowerCase();   

console.log(c)
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
