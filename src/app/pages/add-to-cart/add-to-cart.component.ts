import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  templateUrl: './add-to-cart.component.html',
  imports: [CommonModule, FormsModule],
})
export class AddToCartComponent implements OnInit, OnDestroy {

  cartItems: any[] = [];
  total: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.getItems().subscribe(items => {
        this.cartItems = items;
        this.updateTotal();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.subscription.add(
        this.cartService.getItems().subscribe(items => {
          this.cartItems = items;
          this.updateTotal();
        })
      );
    });
  }

  onQuantityChange() {
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  checkout() {
    this.router.navigate(['purchase']);
  }

  // New Method to navigate to the Purchase Page
  goToPurchasePage() {
    this.router.navigate(['purchase']);
  }
}
