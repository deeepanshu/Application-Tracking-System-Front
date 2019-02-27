import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-list-jobs-admin',
  templateUrl: './list-jobs-admin.component.html',
  styleUrls: ['./list-jobs-admin.component.css']
})
export class ListJobsAdminComponent implements OnInit {

  jobs: any;

  constructor(
    private jobService: JobsService
  ) { }

  ngOnInit() {
    this.jobService.getAllJobs().then((response)=> {
      this.jobs = response;
      console.log(this.jobs);
    })
  }

}
