import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'https://localhost:7199/api/Course';

  constructor(private http: HttpClient) { }

  getCourses(search: string = ''): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}?search=${search}`);
  }

  createCourse(course: Course): Observable<any> {
    return this.http.post(this.apiUrl, course);
  }

  updateCourse(id: string, course: Course): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course);
  }
}