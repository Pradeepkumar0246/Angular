import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, Cart } from './types'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-shoppingcart',
  imports: [FormsModule,CommonModule],
  templateUrl: './shoppingcart.html',
  styleUrl: './shoppingcart.css'
})
export class Shoppingcart {
   count = 0;
  showpass = false;
  txtvalue = '';
  num1 = 0;
  num2 = 0;
  showpro = true;
  catogry = '';

  myCart = new Cart();

  products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000, img: 'image1.jpg' },
    { id: 2, name: 'T-Shirt', price: 20, img: 'image2.jpg' },
    { id: 3, name: 'Headphones', price: 50, img: 'image3.jpg' }
  ];

  counter() {
    this.count++;
  }

  showpassword() {
    this.showpass = !this.showpass;
  }

  addToCart(product: Product, qty: number) {
    console.log(this.myCart.addToCart(product, qty));
  }

  removeFromCart(productId: number) {
    console.log(this.myCart.removeFromCart(productId));
  }

  applyDiscount(code: string) {
    console.log(this.myCart.applyDiscount(code));
  }

  calculateTotal(): number {
    return this.myCart.calculateTotal();
  }
}
