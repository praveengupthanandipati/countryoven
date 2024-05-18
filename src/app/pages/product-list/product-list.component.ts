import { LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  cityname: any;
  originalcityname: any;
  type: any;
  PageName: any;
  psize: number = 40;
  productData: any;
  products: any = [];
  filters: any = []
  filterswrapper: any;
  displayproducts: any;
  currentPage: number = 0;
  totalPages: number = 0;
  pagesBeforeCurrent: number[] = [];
  pagesAfterCurrent: number[] = [];
  isHiddensearchFilter = false;
  metaData: any;
  typeName: any;
  breadTitle: any;
  breadcatTitle: any;
  breadcatTitleLink: any;
  getOldUrl: any;
  sorder: any = 2;
  sortValue: any = 'New Arrival';
  loading: boolean = true;
  isfilters: boolean = false;
  totalCount: any;
  currency: any;
  country: any;
  isload: boolean = false;
  showloadmore: boolean = false;
  private paramMapSubscription: Subscription = new Subscription;
  private paramMapSubscription1: Subscription = new Subscription;

  isVisible: boolean = false;
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }



  routeCity(e: any) {
    this.router.navigateByUrl(e.toLowerCase() + '/gift-online');
  }
  routeCategory(e: any) {

    this.router.navigateByUrl(e + '/' + this.originalcityname.toLowerCase() + '/online-delivery');

  }

  filterChanged(filterOption: any): void {
    this.products = [];
    const filterGroup = this.filterswrapper.find((group: any) => group.filterOptions.includes(filterOption));

    if (filterGroup) {
      const selectedValuesByFilterType: any = {};
      for (const filterGroup of this.filterswrapper) {
        const selectedValues = filterGroup.filterOptions
          .filter((option: any) => option.selected)
          .map((selectedOption: any) => selectedOption.value);

        if (selectedValues.length > 0) {
          selectedValuesByFilterType[filterGroup.filterType] = selectedValues;
        }
      }


      this.isfilters = Object.keys(selectedValuesByFilterType).length ? true : false;




      this.filters = [selectedValuesByFilterType]
      this.currentPage = 1;
      this.getProductDetails([selectedValuesByFilterType], this.currentPage, this.sorder);




    }
  }



  constructor(private renderer: Renderer2, private titleService: Title, private location: Location, private locationStrategy: LocationStrategy,
    private meta: Meta, private _crud: CurdService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.originalcityname = localStorage.getItem('city')

    this.currency = localStorage.getItem('currency')
    this.country = localStorage.getItem('country');
    this.router.events.subscribe(() => {
      this.originalcityname = localStorage.getItem('city')

      this.currency = localStorage.getItem('currency')
      this.country = localStorage.getItem('country');
    });


  }


  addLoader() {
    this.renderer.addClass(document.body, 'bodyloader');
  }
  removeLoader() {
    this.renderer.removeClass(document.body, 'bodyloader');
  }
  filterclear() {
    window.location.reload();
  }

  ngOnDestroy() {

    // Unsubscribe when the component is destroyed
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.paramMapSubscription1) {
      this.paramMapSubscription1.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.addLoader();
    this.paramMapSubscription = this.route.paramMap.subscribe((params: any) => {
if(params['params']['cityname'] !='send-online')
{
  setTimeout(() => {

    this.filters = [];
    this.isfilters = false;
    this.products = []
    this.getPageRoutes(params);
    this.getMeta();
    this.getProductDetails(this.filters, 1, this.sorder);
    this.getFiltersDetails();
  }, 1000);
}
     



    });
  }

  getnewurl(urlcity: any) {

    this.getOldUrl = this.router.url;

    let newurl = this.getOldUrl.replace(urlcity, this.cityname.toLowerCase());
    this.location.replaceState(newurl);
    this.addCanonicalLink(newurl)
  }


  getPageRoutes(params1: any) {

    this.route.params.subscribe((params) => {


      if (params['cityname'] == 'send-online') {

      }
      else {
        if (params['favspl']) {
          let urlparms = params['favspl'].split('-to-');
          if (urlparms.length > 1) {
            this.typeName = 'FLV';
            this.cityname = urlparms[1];
            this.setCity(urlparms[1]);
            this.cityname = this.originalcityname;
            this.PageName = urlparms[0]

            this.getnewurl(urlparms[1])
          }
          else {
            let urlparms1 = params['favspl'].split('-');
            this.cityname = urlparms1[urlparms1.length - 1];
            this.setCity(this.cityname);
            this.cityname = this.originalcityname;
            this.getnewurl(urlparms1[urlparms1.length - 1])
          
            this.typeName = 'SPL';
            let resultArray: any = '';
            for (let i = 0; i < urlparms1.length - 1; i++) {
              if (resultArray == '') {
                resultArray = urlparms1[i];
              }
              else {
                resultArray = resultArray + '-' + urlparms1[i];
              }

            }
            this.PageName = resultArray
          }

        }
        else if (params['cityname1']) {
          this.cityname = params['cityname1'];
          this.typeName = 'CTY';
          this.PageName = params['PageName1'];
          this.cityname = this.originalcityname;
          if (params['PageName1'] == 'gifts-online') {
            this.getnewurl(this.originalcityname);

            this._crud.updateCity(localStorage.getItem('city'));

          }
          else {
            this.getnewurl(params['cityname1']);
            this._crud.updateCountry(this.cityname)
          }
          // localStorage.setItem('city', this.cityname);

        }
        else if (params['type']) {


          this.cityname = params['cityname'];
          this.setCity(this.cityname);
          this.cityname = this.originalcityname;
          this.typeName = params['type'];
          this.PageName = params['PageName'];

          if (params['type'] == 'search_result') {

            this.setCity(params['PageName'])

            this.getnewurl(params['PageName'])
          }

          else {
            this.setCity(params['cityname'])
            this.getnewurl(params['cityname'])

          }



        }
        else {

        }


        if (this.typeName == 'online-delivery' || this.PageName == 'online-delivery') {
          this.type = 'C';
          // this.PageName=this.PageName;


          this.PageName = params['type'];

        } else if (this.typeName == 'order') {
          this.type = 'SC';

        }
        else if (this.typeName == 'send') {
          this.type = 'OCC';

        }

        else if (this.typeName == 'SPL') {
          this.type = 'SPL';

        }

        else if (this.typeName == 'FLV') {
          this.type = 'FLV';
          this.sortValue = 'Recommended';
          this.sorder = 1;

        }
        else if (this.typeName == 'search_result') {
         
          this.type = 'SE';
          this.cityname = params['PageName'];
          this.cityname = this.originalcityname;
          this.PageName = params['cityname'];
        }




        else {
          this.type = this.typeName;

        }
      }

      // this.PageName = params['PageName'];
    });


    if (this.paramMapSubscription1) {
      this.paramMapSubscription1.unsubscribe();
    }

  }

  selectedItems: any[] = [];




  getMeta(): void {

    const data = {
      cityname: this.cityname,
      Type: this.type,
      PageName: this.PageName
    }

    this._crud.getMeta(data).subscribe(res => {
      this.metaData = res;

      this.titleService.setTitle(res.title);
      this.breadTitle = res.subCategoryNameCapital || res.specialPageCapital || res.occasionNameCapital || res.flavourNameCapital;
      this.breadcatTitle = res.categoryNameCapital;
      this.breadcatTitleLink = res.seoCategoryName;
      // this.breadcatTitle=res.seoCategoryName;
      this.meta.updateTag({ name: 'description', content: res.metaDescription });
      this.meta.updateTag({ name: 'keywords', content: res.metaKeywords });

    })
  }


  setCity(value: any) {
    
  }

  getProductDetails(filters: any, pagenumber?: any, sortOrder?: any, load?: boolean): void {
    this.addLoader();

    this.loading = true;
    const data = {
      cityname: this.cityname,
      country: this.country,
      Type: this.type,
      PageName: this.PageName,
      currencySelected: this.currency,
      PageNumber: pagenumber,
      PageSize: this.psize,
      productFilters: filters,
      sortOrder: sortOrder
    }

    this._crud.getProductDetails(data).subscribe(res => {
      this.removeLoader();
      this.loading = false;

      this.productData = res;
      if (this.productData && this.productData.totalCount == 0 && data.productFilters.length==0) {
        this.router.navigateByUrl('/404')
      }


      if (this.productData && (this.productData.totalPages > this.productData.pageNumber)) {
        this.showloadmore = true
      }
      else {
        this.showloadmore = false
      }

      if (this.productData)
      {
        this.products = this.products.concat(this.productData.items)
        this.currentPage = this.productData.pageNumber;
        this.totalPages = this.productData.totalPages
        this.totalCount = this.productData.totalCount;
      } 
     
      if (40 * this.currentPage <= this.totalCount) {
        this.displayproducts = 40 * this.currentPage
      }
      else {
        this.displayproducts = this.totalCount
      }
      if (this.totalCount > this.products.length) {
        this.isload = true
      }
      else {
        this.isload = false
      }
      if (!load) {
        window.scrollTo(0, 0);
      }

    }, (error) => {
      this.removeLoader()
    })
  }

  getFiltersDetails(): void {

    const data = {
      cityname: this.cityname,

      Type: this.type,
      PageName: this.PageName,
      currencySelected: this.currency
    }

    this._crud.getFilters(data).subscribe(res => {

      this.filterswrapper = res;

    }, (error) => {
      this.removeLoader()
    })
  }


  loadmore() {
    if (this.currentPage < this.totalPages) {
      this.showloadmore = true;
      this.currentPage++;
      this.getProductDetails(this.filters, this.currentPage, this.sorder, true);
    }
    else {
      this.showloadmore = false;
    }
    // this.psize=this.psize + 40;
    // this.getProductDetails(this.filters,1, this.sorder);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProductDetails(this.filters, this.currentPage, this.sorder);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProductDetails(this.filters, this.currentPage, this.sorder);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.getProductDetails(this.filters, this.currentPage, this.sorder);
    }
  }

  sortproducts() {
    this.getProductDetails(this.filters, this.currentPage, this.sorder);
  }

  sodervalue(sorder: any, type: any) {
    this.sortValue = type;
    this.sorder = sorder;
    this.products = []
    this.getProductDetails(this.filters, this.currentPage, this.sorder);
  }
  /* test code */

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }







  getPages(): (number | null)[] {
    const pagesToShow = 3; // Adjust as needed
    const pages: (number | null)[] = [];

    // Display pages around the current page
    for (let i = Math.max(1, this.currentPage - pagesToShow); i <= Math.min(this.totalPages, this.currentPage + pagesToShow); i++) {
      pages.push(i);
    }

    // Add ellipses if necessary
    if (this.currentPage - pagesToShow > 2) {
      pages.splice(1, 0, null);
    }

    if (this.currentPage + pagesToShow < this.totalPages - 1) {
      pages.splice(pages.length - 1, 0, null);
    }

    // Add first and last pages
    if (pages[1] !== 2) {
      pages.unshift(1);
    }

    if (pages[pages.length - 2] !== this.totalPages - 1) {
      pages.push(this.totalPages);
    }

    return pages;
  }

  onPageClick(page: number): void {
    // this.pageChanged.emit(page);
  }


  private addCanonicalLink(v: any) {


    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = 'https://www.countryoven.com' + v;
    }
    else {

      const link: HTMLLinkElement = this.renderer.createElement('link');
      link.rel = 'canonical';


      link.href = 'https://www.countryoven.com' + v; // Replace with your canonical URL
      this.renderer.appendChild(document.head, link);
    }


  }


}
