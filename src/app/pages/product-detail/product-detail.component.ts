import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  imports: [CommonModule],
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.loadProductDetails(id);
    });
  }

  loadProductDetails(id: string | null) {
    this.product = this.getProductById(id);
  }

  getProductById(id: string | null): any {
    this.apiService.getProducts().subscribe((d: any)=>{
      this.product = d?.products?.find((e: any)=> e?.productId == id);
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.router.navigate(['add-to-cart']);
    }
  }

  purchase() {
    this.router.navigate(['purchase']);
  }
}
