import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  cityname:any;
  type:any;
  PageName:any;
  productData:any;
  products:any
filters:any=[]
filterswrapper:any;

currentPage: number=0;
  totalPages: number=0;
  pagesBeforeCurrent: number[] = [];
  pagesAfterCurrent: number[] = [];
  isHiddensearchFilter=false;
  metaData: any;
    filterChanged(filterOption: any): void {

const filterGroup = this.filterswrapper.find((group:any) => group.filterOptions.includes(filterOption));

if (filterGroup) {
  const selectedValuesByFilterType:any = {};
  for (const filterGroup of this.filterswrapper) {
    const selectedValues = filterGroup.filterOptions
      .filter((option:any) => option.selected)
      .map((selectedOption:any) => selectedOption.value);
  
    if (selectedValues.length > 0) {
      selectedValuesByFilterType[filterGroup.fitlerType] = selectedValues;
    }
  }
  console.log(selectedValuesByFilterType);
 
//   [
//     {
//          "SubCategoryIds": [2001,2003],
//          "PriceIds": [5,6],
//          "WeightIds":[3]
//     }  
// ],
const fliterV="[" + selectedValuesByFilterType + "]"
this.currentPage=1;
  this.getProductDetails([selectedValuesByFilterType], this.currentPage);




} }
 


constructor (private _crud:CurdService, private route:ActivatedRoute, private formBuilder: FormBuilder)
{


}



  ngOnInit(): void {


    this.route.paramMap.subscribe((params: ParamMap) => {
     
     console.log('sddfds')
     
  this.getPageRoutes();
  this.getMeta();
this.getProductDetails(this.filters, 1);
this.getFiltersDetails()
     
    });





  }

  getPageRoutes()
  {
    this.route.params.subscribe((params) => {
      this.cityname = params['cityname']; 
      this.type = params['type']; 
      this.PageName = params['PageName']; 
     
     
    });
  }

  selectedItems: any[] = [];
  



  getMeta(): void {
    // http://test.countryoven.com/api/Product/meta?cityname=Hyderabad&Type=C&PageName=cakes
    const data={
      cityname:this.cityname,
      Type:this.type,
      PageName:this.PageName
    }

    this._crud.getMeta(data).subscribe(res => {
     this.metaData=res;
      console.log(res)
    
    })
  }


  getProductDetails(filters:any, pagenumber?:any): void {
    
    const data={
      cityname:this.cityname,
      country:'India',
      Type:this.type,
      PageName:this.PageName,
      currencySelected:'INR',
      PageNumber:pagenumber,
      PageSize:10,
      productFilters:filters
    }

    this._crud.getProductDetails(data).subscribe(res => {
     
    this.productData=res;
    console.log(this.productData)
    console.log(this.productData.items.length)
    this.products=this.productData.items
    this.currentPage=this.productData.pageNumber;
this.totalPages=this.productData.totalPages
  })
  }

  getFiltersDetails(): void {
    
    const data={
      cityname:this.cityname,
    
      Type:this.type,
      PageName:this.PageName,
     
    }

    this._crud.getFilters(data).subscribe(res => {
     console.log(res)
   this.filterswrapper=res;

  })
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProductDetails(this.filters, this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProductDetails(this.filters, this.currentPage);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.getProductDetails(this.filters, this.currentPage);
    }
  }



  /* test code */

  

}
