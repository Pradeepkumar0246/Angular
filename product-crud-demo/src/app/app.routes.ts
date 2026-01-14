import { Routes } from '@angular/router';
import { ProductComponent } from './product/product';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' }, 
  { path: 'products', component: ProductComponent },
];
