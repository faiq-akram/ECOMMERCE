import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cart, product, purchase } from '../enum/enum';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<any>{
    return this.http.get('http://localhost:5000/api/products' , {});
  }

  addProducts(params: product): Observable<any>{
    return this.http.post('http://localhost:5000/api/products' , params);
  }

  getCarts(userId: number): Observable<any>{
    return this.http.get(`http://localhost:5000/api/cart/${userId}` , {});
  }

  addCarts(params: cart): Observable<any>{
    return this.http.post('http://localhost:5000/api/products' , params);
  }

  completePurchase(params: purchase): Observable<any>{
    return this.http.post('http://localhost:5000/api/purchase' , params);
  }
}
