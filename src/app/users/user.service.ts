import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/myApp';  // Backend URL

  constructor(private http: HttpClient) {}

  crearUsuario(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/createAdminProfile/`, user);
  }
}
