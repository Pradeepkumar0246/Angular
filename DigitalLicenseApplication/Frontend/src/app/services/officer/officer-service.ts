import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private apiUrl = 'https://localhost:7034/api/Application';

  constructor(private http: HttpClient) {}

  getDepartmentApplications(departmentId: number, status?: string): Observable<Application[]> {
    let url = `${this.apiUrl}/department/${departmentId}`;
    if (status && status.length) url += `?status=${encodeURIComponent(status)}`;
    return this.http.get<Application[]>(url);
  }

  approveApplication(applicationId: number, officerId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${applicationId}/approve?officerId=${officerId}`, {});
  }

 rejectApplication(applicationId: number, officerId: number, reason: string): Observable<any> {
    const body = { officerId, reason };
    return this.http.put(`${this.apiUrl}/${applicationId}/reject`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  downloadDocument(filePath: string): void {
    const base = 'https://localhost:7034'; 
    const url = `${base}${filePath}`;
    window.open(url, '_blank');
  }
}
