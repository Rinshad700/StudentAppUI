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
    return this.http.get<Course[]>(
      `${this.apiUrl}?search=${encodeURIComponent(search)}`
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: string, course: Course): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, course);
  }

}