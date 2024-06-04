import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Info } from './info';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private apiUrl = 'http://127.0.0.1:8000/myApp';

  constructor(private http: HttpClient) {}

  obtenerInfo(): Observable<Info[]> {
    return this.http.get<Info[]>(`${this.apiUrl}/readInfo`);
  }

  createInfo(infoData: FormData): Observable<Info> {
    return this.http.post<Info>(`${this.apiUrl}/createInfo`, infoData);
  }

  getInfo(id: number): Observable<Info> {
    return this.http.get<Info>(`${this.apiUrl}/getInfo/${id}`);
  } //get new method to help update and delete

  updateInfo(id: number, infoData: FormData): Observable<Info> {
    return this.http.put<Info>(`${this.apiUrl}/updateInfo/${id}`, infoData);
  }

  deleteInfo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteInfo/${id}`);
  }

}
