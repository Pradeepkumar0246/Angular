import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base = 'https://localhost:7127/api/Token';
  constructor(private http: HttpClient) {}
  login(
    username: string,
    passwordHash: string
  ): Observable<{
    token: string;
    username: string;
    role: string;
  }> {
    return this.http
      .post<{ token: string; username: string; role: string }>(
        `${this.base}/login`,
        {
          username,
          passwordHash,
        }
      )
      .pipe(
        tap((resp) => {
          if (resp?.token) {
            localStorage.setItem('jwt_token', resp.token);

            localStorage.setItem(
              'current_user',
              JSON.stringify({
                username: resp.username,

                role: resp.role,
              })
            );
          }
        })
      );
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.base}/register`, user);
  }
  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('current_user');
  }
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
  getCurrentUser(): User | null {
    const v = localStorage.getItem('current_user');
    return v ? JSON.parse(v) : null;
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getCurrentUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role?.roleName ?? null;
  }
  isAdmin(): boolean {
    return this.getCurrentUserRole() === 'Admin';
  }

  isPatient(): boolean {
    return this.getCurrentUserRole() === 'Patient';
  }
  isUser(): boolean {
    return this.getCurrentUserRole() === 'Doctor';
  }
}
