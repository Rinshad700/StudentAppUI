import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7199/api/User';

  constructor(private http: HttpClient) { }

  getUsers(search: string = ''): Observable<User[]> {

    return this.http.get<User[]>(`${this.apiUrl}?search=${search}`);

  }

  createUser(user: any): Observable<any> {

    return this.http.post(this.apiUrl, user);

  }

  updateUser(id: string, user: any): Observable<any> {

    return this.http.put(`${this.apiUrl}/${id}`, user);

  }

}