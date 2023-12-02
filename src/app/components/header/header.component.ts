import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  categoryList:any;
  menuList:any;
  scrollingMessage:any;
  scrollingOn:any;
  searchList:any;
  topList:any;
  constructor(private _crud:CurdService)
  {
  
  }
    ngOnInit(): void {
      this.getData()
    }
  
    
    getData(): void {
     
      
        this._crud.getTopHeader('').subscribe(res => {
       //  console.log(res)
         this.scrollingMessage=res.scrollingMessage
         this.scrollingOn=res.scrollingOn
         this.categoryList=res.categoryList;
         this.menuList=res.menuList;
         this.searchList=res.searchList;
         this.topList=res.topList;
        })
      }
    
  }