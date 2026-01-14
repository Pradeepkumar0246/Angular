import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private apiUrl = 'https://localhost:7034/api/User';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/GetUsersDTO`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  getUserDTOById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/GetUserDTO${id}`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
 
  addAdmin(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addAdmin`, user);
  }
 
  addOfficer(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addOfficer`, user);
  }

  updateUser(user: User, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('contactNumber', user.contactNumber);
    formData.append('role', user.role);
    if (user.departmentId !== null && user.departmentId !== undefined) {
      formData.append('departmentId', user.departmentId.toString());
    }
    if (file) {
      formData.append('profileImage', file, file.name);
    }

    return this.http.put(`${this.apiUrl}/${user.userId}`, formData);
  }
}
