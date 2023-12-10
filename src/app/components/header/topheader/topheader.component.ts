import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls:['./topheader.component.scss']
  
})
export class TopheaderComponent implements OnInit {
  @Input('scrollingMessage') scrollingMessage:any;
  @Input('scrolling') scrolling:boolean=false;
  @Input('topList') topList:any;
constructor(private route:Router )
{

}
  ngOnInit(): void {
    
  
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
