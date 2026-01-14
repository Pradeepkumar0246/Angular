import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-product',
  imports:[CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit {

  // Dummy product data
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 50000, category: 'Electronics' },
    { id: 2, name: 'Chair', price: 1500, category: 'Furniture' },
    { id: 3, name: 'Pen', price: 10, category: 'Stationery' },
    { id: 4, name: 'Phone', price: 20000, category: 'Electronics' }
  ];

  filteredProducts: Product[] = [];   // To display after search/filter
  searchTerm: string = '';            // Search input
  newProduct: Product = { id: 0, name: '', price: 0, category: '' };  // For Add
  editingProduct: Product | null = null;  // For Edit

  constructor() { }

  ngOnInit(): void {
    this.filteredProducts = [...this.products]; // Initialize display
  }

  // ------------------- CRUD Operations -------------------

  // Add new product
  addProduct() {
    if (!this.newProduct.name || !this.newProduct.category || this.newProduct.price <= 0) {
      alert('Please fill all fields correctly!');
      return;
    }
    const nextId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    this.products.push({ ...this.newProduct, id: nextId });
    this.filteredProducts = [...this.products];
    this.newProduct = { id: 0, name: '', price: 0, category: '' }; // Reset form
  }

  // Edit product - prefill form
  editProduct(product: Product) {
    this.editingProduct = { ...product }; // Make a copy to edit
  }

  // Update product after editing
  updateProduct() {
    if (this.editingProduct) {
      const index = this.products.findIndex(p => p.id === this.editingProduct!.id);
      if (index !== -1) {
        this.products[index] = this.editingProduct;
        this.filteredProducts = [...this.products];
        this.editingProduct = null; // Close edit form
      }
    }
  }

  // Cancel editing
  cancelEdit() {
    this.editingProduct = null;
  }

  // Delete product
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(p => p.id !== id);
      this.filteredProducts = [...this.products];
    }
  }

  // ------------------- Search Operation -------------------
  searchProduct() {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
