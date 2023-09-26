import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-midheader',
  templateUrl: './midheader.component.html',
  styleUrls:['./midheader.component.scss']
})
export class MidheaderComponent {
  @Input('searchList') searchList:any;
}
