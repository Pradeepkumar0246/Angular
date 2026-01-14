import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sample } from './sample/sample';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sample],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular');
}
