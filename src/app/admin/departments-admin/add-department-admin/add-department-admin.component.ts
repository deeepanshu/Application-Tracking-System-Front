import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Department } from 'src/app/types/department.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-department-admin',
  templateUrl: './add-department-admin.component.html',
  styleUrls: ['./add-department-admin.component.css']
})
export class AddDepartmentAdminComponent implements OnInit {
  addDepartmentForm = new FormGroup({
    departmentName: new FormControl('')
  });

  addProfileForm = new FormGroup({
    departmentName : new FormControl(''),
    profileName: new FormControl('')
  });

  departments: Department[] = [];

  submitDepartmentName() {
    const departmentName = this.addDepartmentForm.get('departmentName').value;
    if (departmentName) {
      if (confirm(`Are you sure you want to add ${departmentName}?`)) {
        const department = new Department(departmentName, []);
        this.adminService.addDepartment(department).subscribe(response => {
          this.toastr.success(
            `Department '${response.departmentName}' added successfully!`
          );
          this.router.navigate(['admin/departments/list']);
        });
      } else {
        this.toastr.info('Adding department denied by user.');
      }
    } else {
      this.toastr.info('Empty Department Name.');
    }
  }

  submitProfileName() {
    console.log(this.addProfileForm.value);
    const departmentName = this.addProfileForm.get('departmentName').value;
    const profileName = this.addProfileForm.get('profileName').value;
    const department = new Department(departmentName, [profileName]);
    this.adminService.addProfile(department).subscribe((response) => {
      console.log(response);
      this.toastr.success(
        `Profile '${profileName}' added to '${departmentName}' successfully!`
      );
      this.router.navigate(['admin/departments/list']);
    });
  }

  onDepartmentNameChange(event) {
    if (event.target.value) {
      this.addProfileForm.get('departmentName').setValue(event.target.value);
      console.log(this.addProfileForm.get('departmentName').value);
    }
  }

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getDepartments() {
    this.adminService.getDepartments().subscribe((response) => {
      this.departments = response;
    })
  }

  ngOnInit() {
    this.getDepartments();
  }
}
