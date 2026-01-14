import { Component, computed, inject } from '@angular/core';
import { FoodService } from '../food';
import { CartItem, Food } from '../../Models/Food.model';

@Component({
  selector: 'app-food-cart',
  imports: [],
  templateUrl: './food-cart.html',
  styleUrl: './food-cart.css'
})
export class FoodCart {
  private foodservice=inject(FoodService);
  cartItems: CartItem[] = [];
  total = 0;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.foodservice.getCart().subscribe(data => {
      this.cartItems = data;
      this.total = data.reduce((sum, item) => sum + (item.food?.price ?? 0) * item.quantity, 0);
    });
  }

  removeItem(id: number) {
    this.foodservice.removeFromCart(id).subscribe(() => this.loadCart());
  }

  clearCart() {
    this.foodservice.clearCart().subscribe(() => this.loadCart());
  }
}
