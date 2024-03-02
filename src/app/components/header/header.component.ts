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
  // showpopup:boolean=false;
  onLoadNotifications:any;
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
         this.onLoadNotifications=res.onLoadNotifications;
         this.showribbon=true;

         
        })
      }   

      isScrolled: boolean = false;

      @HostListener('window:scroll', [])
    onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollOffset > 100; // Adjust the scroll threshold as needed
  }



// showpopupfn(res:any)
// {
//   if(localStorage.getItem('popupid') && localStorage.getItem('popupid') == res.id)
//   {
  
//   }  else
//   {
//     localStorage.setItem('popupid', res.id);
//     setTimeout(() => {
//       this.showpopup=true;
//     }, 5000);

//   }



// }


  }