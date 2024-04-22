import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-midheader',
  templateUrl: './midheader.component.html',
  styleUrls: ['./midheader.component.scss']
})
export class MidheaderComponent implements OnInit {
  @Input('searchList') searchList: any;
  isLogend: boolean = false;
  email: any;
  custID: any;
  custName: any;
  count: any;
  sessionId: any;
  city: any;
  countryname: any;
  currency: any;
  customerId: any = 0;
  searcherror: boolean = false;
  private subscription!: Subscription;
  private datasubscription !: Subscription;
  private citysubscription!: Subscription;
  private currencysubscription!: Subscription;
  selectedCurrency: any;

  currencydrop: any = ['INR', 'USD'];
  searchkeyword: any;

  showAutocomplete: boolean = false;
  autoCompleteList: any;
  selectedItemIndex: number | null = null;
  constructor(private route: Router, private _curdService: CurdService, private cookieService: CookieService) {
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.custID = localStorage.getItem('customerId')
      this.custName = localStorage.getItem('custName')
    }



    this.sessionId = this.cookieService.get('sessionID')
    this.city = localStorage.getItem('city')
    
    this.countryname = localStorage.getItem('country');
    this.currency = localStorage.getItem('currency');
    if (localStorage.getItem('customerId')) {
      this.customerId = localStorage.getItem('customerId')
    }

  }
  onCurrecnySelected() {


    localStorage.setItem('currency', this.selectedCurrency)
    window.location.reload();
  }

  ngOnInit(): void {
    this.subscription = this._curdService.headerData$.subscribe((data) => {

      this.count = data;
    });

    this.datasubscription = this._curdService.countryData$.subscribe((data) => {


      this.city = data
      
    })

    this.currencysubscription = this._curdService.currencyData$.subscribe((data) => {
     
     this.city = localStorage.getItem('city');
    });

    

    this.citysubscription = this._curdService.cityData$.subscribe((data) => {

      this.city = localStorage.getItem('city');
      
      if (localStorage.getItem('currency')) {
        this.selectedCurrency = localStorage.getItem('currency')

      }
      else {

      }

    });

    // this.getCarts();


    if (localStorage.getItem('currency')) {
      this.selectedCurrency = localStorage.getItem('currency')

    }
    else {

    }

    this.autoCompleteList = this.searchList;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.datasubscription.unsubscribe();
  }




  getCarts() {
    let data = {
      customerId: this.customerId,
      sessionId: this.sessionId,
      cityName: this.city,
      countryName: this.countryname,
      currencySelected: this.currency
    }

    this._curdService.headerShopingCart(data).subscribe(res => {


      this.count = res.cartItemsCount;

    });
  }


  gotorouteclick(item: any) {

    this.searcherror = false;
    let c = localStorage.getItem('city');
    this.route.navigateByUrl('/search_result' + '/' + item + '/' + c)
    setTimeout(() => {
      this.searchkeyword = '';
      this.isVisible = false
    }, 1000);

  }

  gotoroute() {
    this.showAutocomplete = false;

    if (this.searchkeyword) {
      this.searcherror = false;
      let c = localStorage.getItem('city');
      this.route.navigateByUrl('/search_result' + '/' + this.searchkeyword + '/' + c)
      setTimeout(() => {
        this.searchkeyword = '';
        this.isVisible = false
      }, 1000);
    }
    else {
      this.searcherror = true;
    }
  }
  selectLoc() {
    if (localStorage.getItem('city')) {

    }

  }
  logout() {

    localStorage.removeItem('email');
    localStorage.removeItem('custName');
    localStorage.removeItem('customerId');
    localStorage.removeItem('email');

    let data = {



      "customerId": this.custID,
      "SessionId": this.sessionId


    }
    this._curdService.logout(data).subscribe(res => {
      window.location.reload();
      window.location.href = '/';
    });




    // this.route.navigateByUrl('/')





    // window.location.reload();
  }

  isVisible: boolean = false;
  toggleVisibilitySearch() {
    this.isVisible = !this.isVisible;
  }


  onSearchInput(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.searchkeyword = value;

    this.autoCompleteList = this.filterItems(value);
    this.showAutocomplete = !!this.autoCompleteList.length;
  }

  onInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      if (this.autoCompleteList.length > 0) {
        if (this.selectedItemIndex === null) {
          this.selectedItemIndex = direction === 1 ? 0 : this.autoCompleteList.length - 1;
        } else {
          this.selectedItemIndex = (this.selectedItemIndex + direction + this.autoCompleteList.length) % this.autoCompleteList.length;
        }
      }
    } else if (event.key === 'Enter' && this.selectedItemIndex !== null) {
      this.selectItem(this.autoCompleteList[this.selectedItemIndex]);
    }
  }

  highlightItem(index: number) {
    this.selectedItemIndex = index;
  }

  selectItem(item: string) {
    //  this.searchkeyword = item;

    this.showAutocomplete = false;
    // this.gotoroute()
    this.gotorouteclick(item)
  }

  private filterItems(value: string): string[] {
    return this.searchList.filter((item: string) => item.toLowerCase().includes(value.toLowerCase()));
  }


}
