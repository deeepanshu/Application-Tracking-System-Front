import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-jobs-admin',
  templateUrl: './jobs-admin.component.html',
  styleUrls: ['./jobs-admin.component.css']
})
export class JobsAdminComponent implements OnInit {

  jobs: any;

  constructor(
    private jobService: JobsService
  ) { }


  getAllJobs(){
    this.jobService.getAllJobs().then((response) => {
      this.jobs = response;
      console.log(this.jobs);
    });
  }

  ngOnInit() {
    this.getAllJobs();
  }

}
