import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  addJobs(job) {
    return new Promise((resolve, reject) => {
      this.http.post(`/api/job/add`, job).subscribe(response => {
        resolve(response);
      });
    });
  }

  getAllJobs() {
    return new Promise((resolve, reject) => {
      this.http.get(`api/job`).subscribe(response => {
        resolve(response);
      });
    });
  }

}
