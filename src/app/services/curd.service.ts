import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurdService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  


  constructor(private http: HttpClient) { }

//   setHeaders(token: string) {
//     this.headers = new HttpHeaders({  'Content-Type': 'application/json' });
//   }

  

  getTopHeader(id: any): Observable<any> {
    const data = {
      category: id
    }

    return this.http.post(`${environment.apiUrl}/home/header`, {});
  }

//   getAttributes(id: any): Observable<any> {
//     const data = {
//       category: id
//     }
//     return this.http.post(`${environment.apiUrl}/v2/fetch-attr-by-catId`, data);
//   }



getBanners(): Observable<any> {
   return this.http.post(`${environment.apiUrl}/home/Banner`, {});
}
getFooters(): Observable<any> {
  return this.http.post(`${environment.apiUrl}/home/Footer`, {});
}



getProducts(obj:any):Observable<any>{
  const data={
    cityname:'Hyderabad',
    country:'India',
    currencySelected:'INR'
  }
return this.http.post(`${environment.apiUrl}/home/homepageproducts`,data)
}


getMeta(obj:any):Observable<any>{
    // const data={
    //   cityname:'Hyderabad',
    //   Type:'India',
    //   PageName:'INR'
    // }

  
return this.http.post(`${environment.apiUrl}/Product/meta`,obj)
}


getFilters(obj:any):Observable<any>{
 
  
return this.http.post(`${environment.apiUrl}/Product/filter`,obj)
}


getProductDetails(obj:any):Observable<any>{
  
return this.http.post(`${environment.apiUrl}/Product/details`,obj)
}

}
