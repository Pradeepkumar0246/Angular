import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Authservice } from '../services/auth/authservice';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: Authservice, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
