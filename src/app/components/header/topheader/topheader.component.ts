import { Component, Input, OnInit } from '@angular/core';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls:['./topheader.component.scss']
  
})
export class TopheaderComponent implements OnInit {
  @Input('scrollingMessage') scrollingMessage:any;
constructor()
{

}
  ngOnInit(): void {
    console.log(this.scrollingMessage)
  }

  

}
