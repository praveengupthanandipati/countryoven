import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-content',
  templateUrl: './terms-content.component.html',
  styleUrls: ['./terms-content.component.scss']
})
export class TermsContentComponent {

  showMore = false;

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

}
