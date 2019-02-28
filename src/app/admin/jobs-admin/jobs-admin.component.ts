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


  /*
  this.jobService.getAllJobs().then((response) => {
      this.jobs = response;
      console.log(this.jobs);
    });
  */
  getAllJobs(){
    this.jobService.getAllJobs().subscribe(data => {
      this.jobs = data;
    })
  }

  ngOnInit() {
    this.getAllJobs();
  }

}
