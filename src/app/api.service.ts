import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Contacto, Credentials } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>('http://localhost:8080/api/contactos');
  }

  login(credentials: Credentials) {
    return this.http
      .post('http://localhost:8080/login', credentials, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const body = response.body;
          const headers = response.headers;

          const bearerToken = headers.get('Authorization')!;
          const token = bearerToken.replace('Bearer ', '');

          localStorage.setItem('token', token);
          return body;
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
