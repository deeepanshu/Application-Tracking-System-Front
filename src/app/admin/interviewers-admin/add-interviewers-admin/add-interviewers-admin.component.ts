import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InterviewersService } from 'src/app/services/interviewers.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/types/department.interface';
import { ToastrService } from 'ngx-toastr';
import {patternValidator} from './../../../pattern-validator';
@Component({
  selector: 'app-add-interviewers-admin',
  templateUrl: './add-interviewers-admin.component.html',
  styleUrls: ['./add-interviewers-admin.component.css']
})
export class AddInterviewersAdminComponent implements OnInit {

  departments: Department[] = [];
  profiles: string[];

  addInterviewerForm: FormGroup;


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
    let isnum = /^\d+$/.test(this.addInterviewerForm.get('contact').value) && this.addInterviewerForm.get('contact').value.length ===10;
    if(isnum){
      const interviewer = this.addInterviewerForm.value as Interviewer;
      console.log(this.addInterviewerForm.value);
      this.interviewerService.addInterviewer(interviewer).subscribe((response) => {
        console.log(response);
        this.toastr.success(`Added ${interviewer.name} as Interviewer!`);
        this.router.navigate(['admin/interviewers/list']);
      });
    }
    else {
      this.toastr.error("Invalid Contact Number");
    }

  }

  constructor(
    private interviewerService: InterviewersService,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.addInterviewerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      contact: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required])
    });
    this.getDepartments();
  }

}
