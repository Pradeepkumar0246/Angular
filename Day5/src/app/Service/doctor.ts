import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Models/Doctor.model';
import { Hospital } from '../Models/Hospital.model';
@Injectable({
providedIn: 'root'
})
export class DoctorserService {
private base = "https://localhost:7127/api";
constructor(private http: HttpClient) { }
getAll(): Observable<Doctor[]> {
return this.http.get<Doctor[]>(`${this.base}/Doctors`);
}
getById(id: string): Observable<Doctor> {
return this.http.get<Doctor>(`${this.base}/Doctors/${id}`);
}

getHospitals(): Observable<Hospital[]> {
return this.http.get<Hospital[]>(`${this.base}/Hospitals`);
}
add(doc: Partial<Doctor>): Observable<Doctor> {
return this.http.post<Doctor>(`${this.base}/Doctors`, doc);
}
update(doc: Doctor): Observable<Doctor> {
return this.http.put<Doctor>(`${this.base}/Doctors/${doc.doctorId}`,doc);
}
delete(id: string): Observable<any> {
return this.http.delete(`${this.base}/Doctors/${id}`);
}
}