import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  UserLoginModel,
  LoginResponseModel,
  UserRegisterModel,
  User,
} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private apiUrl = 'https://localhost:7034/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(model: UserLoginModel): Observable<LoginResponseModel> {
    return this.http
      .post<LoginResponseModel>(`${this.apiUrl}/Auth/login`, model)
      .pipe(
        tap((response) => {
          console.log('Login response:', response);
          if (response && response.token && response.user) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('role', response.user.role);
            localStorage.setItem('email', response.user.email);
          }
        })
      );
  }
  redirectAfterLogin(): string {
    const role = localStorage.getItem('role');
    if (role === 'Admin') return '/admin';
    if (role === 'Officer') return '/officer';
    if(role==='User')return '/dashboard';
    return '/dashboard';
  }
  register(model: UserRegisterModel) {
    return this.http.post(`${this.apiUrl}/User/register`, model);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): any {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
  
  getUserEmail(): string | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    try {
      const user = JSON.parse(userJson);
      return user.email || null;
    } catch {
      return null;
    }
  }

  getUserRole(): string | null {
    const roleString = localStorage.getItem('role');
    if (!roleString) return null;
    try {
      const roleObj = JSON.parse(roleString);
      return roleObj.roleName || null; 
    } catch {
      return null;
    }
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${user.userId}`, user);
  }
}
