import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent {
  @Input('categoryList') categoryList:any;
  @Input('menuList') menuList:any;
  city:any;
  constructor(private route:Router)
{

}
  ngOnInit(): void {
this.city=localStorage.getItem('city')
  }

gotoroute( t:any, pname:any)
{
console.log(t)
  if(t == 'C')
  {
    t='cakes'
  } else if(t=='SC')
  {
    t='best-sellers-cakes-online'
  }
  else if(t=='OCC')
  {
    t='birthday-gifts-online'
  }
  else if(t=='SPL')
  {
    t='same-day-gifts'
  }
  else if(t=='FLV')
  {
    t='almond'
  }
  else if(t=='SE')
  {
    t='cakes'
  }
  else
  {
    t=t
  }

  console.log(t)
  let c=localStorage.getItem('city')   
this.route.navigateByUrl('/'+ t + '/'+ c + '/' + pname)
}

}
