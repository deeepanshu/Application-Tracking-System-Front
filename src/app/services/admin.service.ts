import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../types/department.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getDepartments() : Observable<Department[]>{
    return this.http.get<Department[]>(`/api/admin/get/departments`);
  }
  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`/api/admin/add/department`, department );
  }

  addProfile(department: Department): Observable<Department> {
    console.log(department);
    return this.http.post<Department>('/api/admin/add/profile', department);
  }
}
