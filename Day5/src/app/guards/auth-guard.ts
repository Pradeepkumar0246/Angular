import { Injectable } from '@angular/core';
import { CanActivate, Router } from
'@angular/router';
import { AuthService } from '../Service/auth';
@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
canActivate(): boolean {
if (this.auth.isLoggedIn()) return true;
console.log('Token:', this.auth.getToken());
this.router.navigate(['/login']);
return false;
}
}