import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'https://localhost:7199/api/Department';

  constructor(private http: HttpClient) { }

getDepartments(search: string = ''): Observable<Department[]> {

  return this.http.get<Department[]>(
    `${this.apiUrl}?search=${encodeURIComponent(search)}`
  );

}
  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }
  updateDepartment(id: string, department: Department): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, department);
}
getActiveDepartments(): Observable<Department[]> {
  return this.http.get<Department[]>(this.apiUrl);
}
}