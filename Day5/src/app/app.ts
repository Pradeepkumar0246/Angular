import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Service/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Day5');
  constructor(public auth: AuthService) {}
logout() {
this.auth.logout();
}
}
