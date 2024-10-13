import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart'; // Updated with correct API URL
  private cartItems: any[] = [];

  constructor(private http: HttpClient) {
    this.loadItems(); // Load items from localStorage on initialization
  }

  private loadItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      tap(items => this.cartItems = items),
      catchError(this.handleError<any[]>('getItems', []))
    );
  }

  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product).pipe(
      tap(() => {
        const itemIndex = this.cartItems.findIndex(item => item.id === product.id);
        if (itemIndex > -1) {
          this.cartItems[itemIndex].quantity += 1;
        } else {
          this.cartItems.push({ ...product, quantity: 1 });
        }
        this.saveItems();
      }),
      catchError(this.handleError<any>('addToCart'))
    );
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`).pipe(
      tap(() => {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.saveItems();
      }),
      catchError(this.handleError<any>('removeFromCart'))
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`).pipe(
      tap(() => {
        this.cartItems = [];
        this.saveItems();
      }),
      catchError(this.handleError<any>('clearCart'))
    );
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private saveItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
