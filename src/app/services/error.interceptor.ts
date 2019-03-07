import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable ()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          if (error.status === 504) {
            errorMessage = `Cannot connect to server right now! Try again later..`;
          } else if (error.status === 401) {
            errorMessage = `Unauthorised`;
            this.authService.logout();
            this.router.navigate([`/login`]);
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }
        this.toastr.error(errorMessage);
        return throwError(errorMessage);
      })
    )
  }
}
