import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Authservice } from '../services/auth/authservice';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: Authservice, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (allowedRoles && allowedRoles.includes(userRole!)) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
