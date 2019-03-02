import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  addJob(job) {//
    return this.http.post(`/api/job/add`, job).pipe(
      catchError(this.handleError<any>('addJob'))
    );
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`/api/job`).pipe(
      catchError(this.handleError('getAllJobs', []))
    );
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`/api/job/${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
