import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forms } from '../../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class Formservice {
  private apiUrl = 'https://localhost:7034/api/Form';

  constructor(private http: HttpClient) {}

  getAllForms(): Observable<Forms[]> {
    return this.http.get<Forms[]>(this.apiUrl);
  }

  getFormById(id: number): Observable<Forms> {
    return this.http.get<Forms>(`${this.apiUrl}/${id}`);
  }

  addForm(form: any): Observable<Forms> {
    return this.http.post<Forms>(this.apiUrl, form);
  }

  updateForm(formId: number, form: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${formId}`, form);
  }

  deleteForm(formId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${formId}`);
  }

  getFormsByDepartment(departmentId: number): Observable<Forms[]> {
    return this.http.get<Forms[]>(`${this.apiUrl}/department/${departmentId}`);
  }
}
