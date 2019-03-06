import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewersService } from '../../../services/interviewers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

  loading: boolean =  false;

  jobId: string;
  candidateId: string;
  record: any;

  resume: string = "";
  cover: string = "";
  introduction: string = "";

  feedbackForm = new FormGroup({
    comments:  new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interviewerService: InterviewersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get("jobid");
    this.candidateId = this.route.snapshot.paramMap.get("candidateid");
    this.resume = `/api/candidate/file/5c7b7bfe9706ff3b48d1abca-1551596737154.pdf`;
    if(!this.jobId && !this.candidateId){
      this.router.navigate(['interviewer']);
    }
    this.loading = true;
    this.interviewerService.getInterviewRecord(this.candidateId, this.jobId).subscribe((response) => {
      this.record = response;
      console.log(this.record);
      this.loading = false;
      if(this.record){

        this.introduction = this.record.candidate.uploads[1].link;
        this.cover = this.record.candidate.uploads[0].cover;
      }
    })

    console.log(this.jobId, this.candidateId);
  }

  onJudgmentChange(event) {
    this.feedbackForm.get('status').setValue(event.target.value);
    this.feedbackForm.get('status').updateValueAndValidity();
  }


  submitForm() {
    if(confirm('Are you sure?')){
      const data = {
        candidate: this.record.candidate._id,
        job: this.record.job._id,
        comments: this.feedbackForm.get('comments').value,
        status: this.feedbackForm.get('status').value,
        recordId: this.record.interviews[0]._id
      }
      console.log(data);
      this.interviewerService.giveFeedback(data).subscribe((response) => {
        console.log(response);
        if(response.success){
          this.toastr.success('Saved Interview Feedback!');
          this.router.navigate(['interviewer']);
        }
        else {
          this.toastr.error(response.message);
        }
      })

    }

  }
  getFileUrl(fileName)  {
    return `/api/candidate/get/assets/${fileName}`;
  }

}
