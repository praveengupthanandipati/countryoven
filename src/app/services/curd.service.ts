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
  const data = {
    category: 'a'
  }

  return this.http.post(`${environment.apiUrl}/home/Banner`, {});
}

}
