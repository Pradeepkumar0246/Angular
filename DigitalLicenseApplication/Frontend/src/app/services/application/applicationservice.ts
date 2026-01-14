import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Application } from '../../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class Applicationservice {
  private apiUrl = 'https://localhost:7034/api/Application';

  private applicationsCache: Application[] | null = null;
  private userApplicationsCache: Map<number, Application[]> = new Map();

  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<Application[]> {
    if (this.applicationsCache) {
      return of(this.applicationsCache);
    }
    return this.http.get<Application[]>(this.apiUrl).pipe(
      tap(apps => {
        this.applicationsCache = apps;
        apps.forEach(app => {
          const userApps = this.userApplicationsCache.get(app.userId) || [];
          userApps.push(app);
          this.userApplicationsCache.set(app.userId, userApps);
        });
      })
    );
  }

  getApplicationsByUser(userId: number): Observable<Application[]> {
    const cached = this.userApplicationsCache.get(userId);
    if (cached) return of(cached);
    return this.http.get<Application[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap(apps => this.userApplicationsCache.set(userId, apps))
    );
  }

  submitApplication(application: any): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application).pipe(
      tap(newApp => {
        if (this.applicationsCache) this.applicationsCache.push(newApp);
        const userApps = this.userApplicationsCache.get(newApp.userId) || [];
        userApps.push(newApp);
        this.userApplicationsCache.set(newApp.userId, userApps);
      })
    );
  }

  updateApplication(applicationId: number, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${applicationId}`, updateData).pipe(
      tap(() => {
        this.clearCache();
      })
    );
  }

  deleteApplication(applicationId: number) {
    return this.http.delete(`${this.apiUrl}/${applicationId}`).pipe(
      tap(() => this.clearCache())
    );
  }

  clearCache(): void {
    this.applicationsCache = null;
    this.userApplicationsCache.clear();
  }
}
