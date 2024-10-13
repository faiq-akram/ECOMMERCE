import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
  imports: [CommonModule , FormsModule]
})
export class CollectionsComponent {

  products: any[] = [];
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  navigateToCollection() {
    
    this.router.navigate(['collections']);
  }

  navigateToProductDetail(productId: number) {
    
    this.router.navigate([`product-detail/${productId}`]);
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.apiService.getProducts().subscribe((d: any)=>{
      this.products = d?.products;
    },(err: any)=>{
      console.log(err);
    })
  }

}
