import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  ngOnInit(): void {}

  constructor(private router: Router) {}

  navigateToCollection() {
    this.router.navigate(['collections']);
  }

  navigateToProductDetail(productId: number) {
    this.router.navigate([`product-detail/${productId}`]);
  }
}
