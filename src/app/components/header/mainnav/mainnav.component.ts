import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../../../environments/environment'
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
  constructor(private route:Router)
{

}
  ngOnInit(): void {
this.city=localStorage.getItem('city');


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
