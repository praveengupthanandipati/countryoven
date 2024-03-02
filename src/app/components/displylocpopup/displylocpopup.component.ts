import { Component } from '@angular/core';

@Component({
  selector: 'app-displylocpopup',
  templateUrl: './displylocpopup.component.html',
  styleUrls: ['./displylocpopup.component.scss']
})
export class DisplylocpopupComponent {

  showpopup:boolean=false;
  constructor()
  {
//     if(localStorage.getItem('city'))
// {
//  this.showpopup=false;
// }
// else
// {
//   this.showpopup=true;
// }
setTimeout(() => {
  if(localStorage.getItem('city'))
{
 this.showpopup=false
} else
{
  this.showpopup=true
}
}, 1000);

  }
  closepopup()
  {
    this.showpopup=false
  }
  selectLoc()
  {
    if(localStorage.getItem('city'))
{
 this.showpopup=false
}

  }
}
