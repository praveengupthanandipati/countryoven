import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-set-loc',
  templateUrl: './set-loc.component.html',
  styleUrls: ['./set-loc.component.scss']
})
export class SetLocComponent  implements OnInit{


  @Input() env?:any;
  @Output() selectEvent:any= new EventEmitter();
 
constructor(private _crud:CurdService, private location: Location)
{
  
  
}

ngOnInit(): void {
  if(this.env =='noloc')
  {

  }

this.getDeliveryCity();
if(localStorage.getItem('city'))
{

}
}
city:any;
desireCity=[{"icon": 'icon-charminar',name:'Hyderabad'},
{"icon": 'icon-redfort',name:'Delhi'},
{"icon": 'icon-mumbai',name:'Mumbai'},
{"icon": 'icon-bengaluru',name:'Bengaluru'},
{"icon": 'icon-kolkatta',name:'Kolkatta'},
{"icon": 'icon-chennai',name:'Chennai'}
 ]
 anotherCity=['Vijayawada','Kakinada','Pune','Bhopal','Warangal','Vizag']
selectedCity(c:any)
{
  this.city=c;  
  localStorage.setItem('city', c);
  this.selectEvent.emit();
  window.location.reload();
}



getDeliveryCity()
{
  let data={}
  this._crud.getDeliveryCity(data).subscribe(res => {
 //   console.log(res)
    
  });
}


}
