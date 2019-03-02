import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: any = [];
  noOfJobs: number = 0;

  constructor(
    private jobService: JobsService,
    private router: Router
  ) { }

  getJobs() {
    this.jobService.getAllJobs().subscribe((response) => {
      this.jobs = response;
      this.noOfJobs = this.jobs.length;
    });
  }

  viewDetails(event, id){
    this.router.navigate([`/jobs/${id}`]);
  }

  ngOnInit() {
    this.getJobs();
  }

}
