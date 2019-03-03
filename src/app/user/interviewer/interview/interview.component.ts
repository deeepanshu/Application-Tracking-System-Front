import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewersService } from '../../../services/interviewers.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interviewerService: InterviewersService
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get("jobid");
    this.candidateId = this.route.snapshot.paramMap.get("candidateid");
    if(!this.jobId && !this.candidateId){
      this.router.navigate(['interviewer']);
    }
    this.loading = true;
    this.interviewerService.getInterviewRecord(this.candidateId, this.jobId).subscribe((response) => {
      this.record = response;
      console.log(this.record);
      this.loading = false;
      if(this.record){
        this.resume = `http://localhost:5000/api/candidate/file/${this.record.candidate.uploads[0].link}`;
        this.introduction = this.record.candidate.uploads[1].link;
        this.cover = this.record.candidate.uploads[0].cover;
      }
    })

    console.log(this.jobId, this.candidateId);
  }

}
