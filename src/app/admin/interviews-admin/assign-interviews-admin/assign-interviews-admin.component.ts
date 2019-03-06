import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { JobsService } from '../../../services/jobs.service';
import { InterviewersService } from 'src/app/services/interviewers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assign-interviews-admin',
  templateUrl: './assign-interviews-admin.component.html',
  styleUrls: ['./assign-interviews-admin.component.css']
})
export class AssignInterviewsAdminComponent implements OnInit {

  applications: any;
  jobs: Job[];
  interviewers: Interviewer[];

  assignForm = new FormGroup({
    candidate: new FormControl('', [Validators.required]),
    interviewer: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    interviewName: new FormControl('', [Validators.required]),
    interviewType: new FormControl('', [Validators.required])
  })


  resetForm() {
    this.assignForm.reset();
  }

  submitForm(jobId) {
    if(jobId){
      console.log(this.assignForm.value, jobId);
      const formData = this.assignForm.value;
      this.jobService.assignInterviewer(jobId, formData).subscribe((response) =>{
        if(response.success){
          this.assignForm.reset();
          this.router.navigate(['/admin/interviews/list'])
          this.toastr.success("Assigned Interview");
        }
        console.log(response);
      })

    }
  }

  onInterviewNameChange(event) {
    console.log(event.target.value);
    this.assignForm.get('interviewName').setValue(event.target.value);
  }


  onInterviewTypeChange(event) {
    console.log(event.target.value);
    this.assignForm.get('interviewType').setValue(event.target.value);
  }

  onCandidateChange(event) {
    this.assignForm.get('candidate').setValue(event.target.value);
  }

  onInterviewerChange(event) {
    this.assignForm.get('interviewer').setValue(event.target.value);
  }
  constructor(
    private jobService: JobsService,
    private interviewerService: InterviewersService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  onPanelExpansion(event, jobId){

    console.log(jobId);
    this.getApplicationsByJobId(jobId);
  }

  getApplicationsByJobId(jobId) {
    this.jobService.getApplications(jobId).subscribe((response) => {
      this.applications = response;
      console.log(response);
    })
  }

  ngOnInit() {
    this.jobService.getAllJobs().subscribe((response) => {
      this.jobs = response;
    });
    this.interviewerService.getAllInterviewers().subscribe((response) => {
      this.interviewers = response;
    })
  }

}
