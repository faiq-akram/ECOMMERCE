import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PurchaseComponent implements OnInit, OnDestroy {
  selectedPaymentMethod: string | null = null;
  totalPrice: number = 0;
  paymentSuccessful: boolean = false;
  cartItems: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.subscription.add(
      this.cartService.getItems().subscribe(items => {
        this.cartItems = items;
        this.totalPrice = this.cartService.getTotalPrice();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  confirmPurchase() {
    if (this.selectedPaymentMethod) {
      console.log(`Payment confirmed with ${this.selectedPaymentMethod}`);
      this.paymentSuccessful = true;
      this.cartService.clearCart().subscribe(() => {
        alert('Purchase successful!');
        this.router.navigate(['/home']);
      });
    } else {
      alert('Please select a payment method.');
    }
  }
}
