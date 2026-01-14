// Shared interfaces and classes

export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];
  discount = 0;

  addToCart(product: Product, quantity: number): string {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    return `${product.name} added to cart.`;
  }

  removeFromCart(productId: number): string {
    this.items = this.items.filter(i => i.product.id !== productId);
    return `Product removed from cart.`;
  }

  applyDiscount(code: string): string {
    if (code === 'SAVE10') {
      this.discount = 0.1;
      return '10% discount applied!';
    }
    return 'Invalid discount code.';
  }

  getCart(): CartItem[] {
    return this.items;
  }

  calculateTotal(): number {
    let total = this.items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    return total - total * this.discount;
  }
}
