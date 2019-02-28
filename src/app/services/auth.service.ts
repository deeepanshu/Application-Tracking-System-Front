import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatusListener=  new Subject<boolean>();


  constructor(
    private http: HttpClient
  ) {}

  getToken(){
    //return this.token;
    return localStorage.getItem('token');

  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  signUp(data) {
    return new Promise((resolve, reject) => {
      return this.http.post(`/api/auth/register`, data).subscribe((response) => {
        resolve(response);
      });
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      return this.http.post<{token: string}>(`/api/auth/login`, data).subscribe((response) => {
        const token = response.token;
        this.token = token;
        this.authStatusListener.next(true);
        resolve(response);
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
  }


}
