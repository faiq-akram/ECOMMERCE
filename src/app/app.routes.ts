// app.routes.ts
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { LayoutComponent } from './pages/layout/layout.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AddToCartComponent } from './pages/add-to-cart/add-to-cart.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LayoutComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'add-to-cart', component: AddToCartComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', redirectTo: 'home' },
];

// Include in your main.ts or bootstrap file
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../app/app.component';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), // Import HttpClientModule here
  ],
});
