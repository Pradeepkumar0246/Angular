import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Productcard } from './productcard/productcard';
import { Studentcard } from './studentcard/studentcard';
import { Coursecard } from './coursecard/coursecard';

@Component({
  selector: 'app-root',
  imports: [Productcard,Studentcard,Coursecard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Assignment1');
}
