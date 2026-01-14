import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../Service/auth';
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
constructor(private auth: AuthService, private router: Router) { }
canActivate(route: ActivatedRouteSnapshot): boolean
{
const expectedRoles: string[] =
route.data['roles'];
const user = this.auth.getCurrentUser();
if (!user || !user.role || !expectedRoles ||
expectedRoles.length === 0) {

this.router.navigate(['/login']);
return false;
}
if (expectedRoles.includes(user.role.roleName!))
{

return true;
}
console.log('Current User:',

this.auth.getCurrentUser());
console.log('Expected Roles:',
route.data['roles']);
// not allowed
this.router.navigate(['/']);

return false;
}
}