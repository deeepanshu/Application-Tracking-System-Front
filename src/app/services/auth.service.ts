import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  signUp(data) {
    return new Promise((resolve, reject) => {
      return this.http.post(`/api/auth/register`, data).subscribe((response) => {
        resolve(response);
      });
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      return this.http.post(`/api/auth/login`, data).subscribe((response) => {
        resolve(response);
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
  }


}
