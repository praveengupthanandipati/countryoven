import { Component } from '@angular/core';

@Component({
  selector: 'app-displylocpopup',
  templateUrl: './displylocpopup.component.html',
  styleUrls: ['./displylocpopup.component.scss']
})
export class DisplylocpopupComponent {

  showpopup:boolean=true;
  constructor()
  {
    if(localStorage.getItem('city'))
{
 this.showpopup=false
}

  }
  selectLoc()
  {
    if(localStorage.getItem('city'))
{
 this.showpopup=false
}

  }
}
