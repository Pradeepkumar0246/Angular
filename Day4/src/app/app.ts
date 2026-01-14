import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FoodList } from './food-list/food-list';
import { FoodDeatil } from './food-deatil/food-deatil';
import { FoodCart } from './food-cart/food-cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Day4');
}
