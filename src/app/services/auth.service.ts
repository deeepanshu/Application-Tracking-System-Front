import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenitcated = false;
  private tokenTimer: any;
  constructor(
    private http: HttpClient
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenitcated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signUp(data): Observable<SignUp>{
    return this.http.post<SignUp>(`/api/auth/register`, data).pipe(
      catchError(this.handleError<SignUp>('signUp'))
    );
  }

  login(data){
    return this.http.post<Login>(`/api/auth/login`, data).pipe(
      map(response => {

        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenitcated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
        }
        return response;
      }),
      catchError(this.handleError<Login>('login'))
    );
  }

  autoAuthUser(){
     const authInfo = this.getAuthData();
     if(!authInfo){
       return;
     }
     const now = new Date();
     const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
     if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenitcated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
     }
  }


  logout() {
    this.clearAuthData();
    this.authStatusListener.next(false);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expiryDate: Date) {
    console.log(token, expiryDate);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiryDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token && !expirationDate) {
       return ;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

}
