import { Injectable } from '@angular/core';
import { Department, DepartmentPostDTO } from '../../models/department.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Departmentservice {
  private apiUrl = 'https://localhost:7034/api/Department';

  constructor(private http: HttpClient) {}

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  addDepartment(dto: DepartmentPostDTO): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, dto);
  }

  updateDepartment(department: Department): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${department.departmentId}`,
      department
    );
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
