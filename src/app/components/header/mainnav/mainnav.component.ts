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
  let c=localStorage.getItem('city')   
this.route.navigateByUrl('/products-list/'+ c + '/'+ t + '/' + pname)
}

}
