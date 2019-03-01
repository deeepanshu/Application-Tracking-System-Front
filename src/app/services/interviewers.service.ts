import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewersService {

  constructor(
    private http: HttpClient
  ) { }

  getAllInterviewers(): Observable<Interviewer[]> {
    return this.http.get<Interviewer[]>(`/api/interviewer/`);
  }

  addInterviewer(data: Interviewer) {
    return this.http.post(`/api/interviewer/add`, data);
  }
}
