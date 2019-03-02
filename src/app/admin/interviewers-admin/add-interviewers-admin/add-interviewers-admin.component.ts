import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InterviewersService } from 'src/app/services/interviewers.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/types/department.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-interviewers-admin',
  templateUrl: './add-interviewers-admin.component.html',
  styleUrls: ['./add-interviewers-admin.component.css']
})
export class AddInterviewersAdminComponent implements OnInit {

  departments: Department[] = [];
  profiles: string[];

  addInterviewerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    profile: new FormControl('', [Validators.required])
  });

  onDepartmentChange(event){
    if (event.target.value) {
      this.addInterviewerForm.get('department').setValue(event.target.value);
      this.profiles = this.departments.find((department) => {
        return department.departmentName === event.target.value;
      }).profiles;
    }
  }
  onProfileChange(event){
    if (event.target.value) {
      this.addInterviewerForm.get('profile').setValue(event.target.value);
    }
  }

  getDepartments() {
    this.adminService.getDepartments().subscribe((response) => {
      this.departments = response;
    });
  }

  submitInterviewer(){
    const interviewer = this.addInterviewerForm.value as Interviewer;
    console.log(this.addInterviewerForm.value);
    this.interviewerService.addInterviewer(interviewer).subscribe((response) => {
      console.log(response);
      this.toastr.success(`Added ${interviewer.name} as Interviewer!`);
      this.router.navigate(['admin/interviewers/list']);
    });
  }

  constructor(
    private interviewerService: InterviewersService,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getDepartments();
  }

}
