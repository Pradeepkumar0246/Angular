import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shoppingcart } from './shoppingcart/shoppingcart';
import { Binding } from './binding/binding';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Shoppingcart,Binding],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Day2');
}
