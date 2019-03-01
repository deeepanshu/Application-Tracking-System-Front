import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/types/department.interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-department-admin',
  templateUrl: './list-department-admin.component.html',
  styleUrls: ['./list-department-admin.component.css']
})
export class ListDepartmentAdminComponent implements OnInit {

  departments: Department[] = [];

  constructor(
    private adminService: AdminService
  ) { }

  getDepartments() {
    this.adminService.getDepartments().subscribe((response) => {
      this.departments = response;
    });
  }

  ngOnInit() {
    this.getDepartments();
  }

}
