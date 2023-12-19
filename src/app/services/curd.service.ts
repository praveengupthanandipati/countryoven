import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurdService {


  private headerDataSubject = new Subject<string>();
  headerData$ = this.headerDataSubject.asObservable();
  updateHeaderData(data: any) {
    this.headerDataSubject.next(data);
  }
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
 
return this.http.post(`${environment.apiUrl}/home/homepageproducts`,obj)
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


//Product Details
// recent viewed


getProductReviews(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/ProductDetails/ReviewsById`,obj)
  }
  
  
getViewedProducts(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/ProductDetails/ViewedProducts`,obj)
  }
  
  
getRelatedProducts(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/ProductDetails/RelatedProducts`,obj)
  }
  


  
  //getProductDetailsById 
  getProductDetailsById(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/ProductDetails/Id`,obj)
    }
  
    //Bind Delivery Timings
getBindDeliveryTimes(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/ProductDetails/BindDeliveryTimes`,obj)
  }
  
    
getSaveProductDetails(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/ProductDetails`,obj)
  }
  

  /* cart */
/*Get Shopping Cart */
postShopingCart(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/Cart`,obj)
  }

  postAddOn(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/Cart/GetAddOn`,obj)
    }

    addAddOn(obj:any):Observable<any>{
  
      return this.http.post(`${environment.apiUrl}/Cart/AddAddOn`,obj)
      }

      deleteProduct(obj:any):Observable<any>{
  
        return this.http.post(`${environment.apiUrl}/Cart/DeleteProduct`,obj)
        }
        updateQuantity(obj:any):Observable<any>{
  
          return this.http.post(`${environment.apiUrl}/Cart/UpdateQuantity`,obj)
          }


       

/* card end */


/* checkout */
UpdateMessage(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/Checkout/UpdateMessage`,obj)
  }

  SaveOrderDetails(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/Checkout/SaveOrderDetails`,obj)
    }

    
applyCoupon(obj:any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/Checkout/ApplyCoupon`,obj)
}
/* checkout */


/*customer */
createCustomer(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/customer/CreateCustomer`,obj)
  }


login(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/customer/Login`,obj)
    }
  
  

forgotpwd(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/customer/ForgetPassword`,obj)
  }

  

  changePassword(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/customer/ChangePassword`,obj)
  }

   

  updateProfile(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/customer/UpdateProfile`,obj)
    }


    
    getByCustomerId(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/customer/GetByCustomerId`,obj)
    }
    
    getMyOrders(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/customer/GetMyOrders`,obj)
    }
    
    getTrackOrder(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/customer/GetTrackOrder`,obj)
    }
 
    getIpAddress(): Observable<any> {
      return this.http.get('https://api.ipify.org?format=json');
    }

    getCountry(obj:any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/home/Country`,obj)
    }
    getState(obj:any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/home/State`,obj)
    }
    getCity(obj:any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/home/City`,obj)
    }

    getDeliveryCity(obj:any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/home/DeliveryCity`,obj)
    }
// address

getAddressByCustomerId(obj:any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/AddressBook/GetAddressByCustomerId`,obj)
}

getAddressByAddressId(obj:any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/AddressBook/GetAddressByAddressId`,obj)
}
addAddress(obj:any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/AddressBook/AddAddress`,obj)
}

updateAddress(obj:any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/AddressBook/UpdateAddress`,obj)
}

deleteAddress(obj:any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/AddressBook/DeleteAddress`,obj)
}


postfranchises(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/franchises`,obj)
  }

  
postcustomize(obj:any):Observable<any>{
  
  return this.http.post(`${environment.apiUrl}/CustomizedCakes/AddCustomizedCake`,obj)

  
  }

  addReview(obj:any):Observable<any>{
  
    return this.http.post(`${environment.apiUrl}/Reviews/Add`,obj)
    }

    getReview(obj:any):Observable<any>{
  
      return this.http.post(`${environment.apiUrl}/Reviews/GetAll`,obj)
      }

      getNotification(obj:any):Observable<any>{
  
        return this.http.post(`${environment.apiUrl}/Notifications/GetAll`,obj)
        }
  
        subscribe(obj:any):Observable<any>{
  
          return this.http.post(`${environment.apiUrl}/Subscribe/Add`,obj)
          }


          track(obj:any):Observable<any>{
  
            return this.http.post(`${environment.apiUrl}/customer/GetTrackOrder`,obj)
            }
            coWalletTracking(obj:any):Observable<any>{
  
              return this.http.post(`${environment.apiUrl}/CoWalletTracking`,obj)
              }

              getReferralCode(obj:any):Observable<any>{
  
                return this.http.post(`${environment.apiUrl}/customer/MyReferralCode`,obj)
                }
        
            
  }
