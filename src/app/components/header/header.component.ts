import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/services/curd.service';
import {HostListener} from '@angular/core';

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
  notificationsCount:any;
  showribbon:boolean=false;
  constructor(private _crud:CurdService)
  {  
  }
    ngOnInit(): void {
      this.getData()
    }     
    getData(): void {          
        this._crud.getTopHeader('').subscribe(res => {       
         this.scrollingMessage=res.scrollingMessage
         this.scrollingOn=res.scrollingOn
         this.categoryList=res.categoryList;
         this.menuList=res.menuList;
         this.searchList=res.searchList;
         this.topList=res.topList;
         this.notificationsCount=res.notificationsCount;
         this.showribbon=true;
        })
      }   

      isScrolled:boolean = false;

      @HostListener('window:scroll', [])
      onWindowScroll(){
        this.isScrolled = window.scrollY > 100;
      }
  }