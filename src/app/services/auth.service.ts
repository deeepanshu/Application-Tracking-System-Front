import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import getLoginRoles from '../types/loginRoles.interface';
import getRouteFromRole from '../types/roleRoute.interface';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenitcated = false;
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenitcated;
  }

  getAuthStatusListener() {
    console.log('getAuthListen()');
    return this.authStatusListener.asObservable();
  }

  signUp(data): Observable<SignUp> {
    return this.http
      .post<SignUp>(`/api/auth/register`, data)
      .pipe(catchError(this.handleError<SignUp>('signUp')));
  }

  login(data) {
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
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate);
        }
        return response;
      }),
      catchError(this.handleError<Login>('login'))
    );
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
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
    this.token = null;
    this.isAuthenitcated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
  }

  validateEmail(
    identifier: String
  ): Observable<{
    success: string;
    message: string;
    token: string;
    expiresIn: number;
    status: number;
    isMobileVerified: boolean;
  }> {
    return this.http.get<{
      success: string;
      message: string;
      token: string;
      expiresIn: number;
      status: number;
      isMobileVerified: boolean;
    }>(`api/auth/validate/email/${identifier}`);
  }

  verifyMobile(
    mobile: string
  ): Observable<{ success: string; message: string }> {
    return this.http.post<{ success: string; message: string }>(
      `api/auth/verify/mobile/`,
      { mobile }
    );
  }

  validateMobile(
    identifier: string
  ): Observable<{ success: string; message: string }> {
    return this.http.get<{ success: string; message: string }>(
      `api/auth/validate/mobile/${identifier}`
    );
  }


  jumpToProfile() {
    const token = this.getToken();
    if (token) {
      const decoded = helper.decodeToken(token);
      if (decoded) {
        if (
          decoded.role === getLoginRoles().ROLE_ADMIN ||
          decoded.role === getLoginRoles().ROLE_INTERVIEWER ||
          decoded.role === getLoginRoles().ROLE_CANDIDATE
        ) {
          this.router.navigate([getRouteFromRole()[decoded.role]]);
        }
      }
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expiryDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiryDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token && !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
}
