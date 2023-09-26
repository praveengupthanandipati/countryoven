import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent {
  @Input('categoryList') categoryList:any;
  @Input('menuList') menuList:any;
  constructor()
{

}
  ngOnInit(): void {
    console.log(this.categoryList)
  }
}
