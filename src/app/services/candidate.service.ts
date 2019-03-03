import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { projection } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient
  ) { }

  apply(jobId: string): Observable<{success: boolean, message: string}>{
    return this.http.get<{success: boolean, message: string}>(`/api/job/apply/${jobId}`);
  }

  getCandidateObjectList(projection: string): Observable<Candidate>{
    return this.http.get<Candidate>(`/api/candidate/list/${projection}`);
  }

  getCandidate(id) {
    return this.http.get(`/api/candidate/${id}`);
  }
  
  getCandidates(){
    return this.http.get(`/api/candidate`);
  }

  addReferenceToCandidate(references) {
    return this.http.post(`/api/candidate/add/reference`, references);
  }

  addEducationToCandidate(education) {
    return this.http.post(`/api/candidate/add/education`, education);
  }

  addEmploymentToCandidate(employments) {
    return this.http.post(`/api/candidate/add/employment`, employments);
  }

  addUploadsToCandidate(uploads){
    return this.http.post(`/api/candidate/add/uploads`, uploads);
  }

  addAddressToCandidate(address) {
    return this.http.post(`/api/candidate/add/address`, address);
  }

  finalizeCandidateProfile(): Observable<{success:boolean}> {
    return this.http.get<{success:boolean}>(`/api/candidate/finalize`);
  }

}
