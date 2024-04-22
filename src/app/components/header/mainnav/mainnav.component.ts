import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {environment} from '../../../../environments/environment'
import { CurdService } from 'src/app/services/curd.service';
@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent {
  @Input('categoryList') categoryList:any;
  @Input('menuList') menuList:any;
  city:any;
  environment = environment;
  constructor(private route:Router, private _crud:CurdService)
{
 

  this.route.events.subscribe((event:any) => {

    if (event instanceof NavigationEnd) {
      
      this.getData();
      
    }

   
  });




}
  ngOnInit(): void {
this.city=localStorage.getItem('city');


  }



  getData(): void {          
    this._crud.getTopHeader('').subscribe(res => {       
   
     this.categoryList=res.categoryList;
    

     
    })
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
