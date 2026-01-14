import { Component, signal } from '@angular/core';
import { ProductComponent } from "./product/product";

@Component({
  selector: 'app-root',
  imports: [ProductComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('product-crud-demo');
}
