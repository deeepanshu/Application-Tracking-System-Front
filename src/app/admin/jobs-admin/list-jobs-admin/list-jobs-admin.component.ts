import { Component, OnInit, Input } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-list-jobs-admin',
  templateUrl: './list-jobs-admin.component.html',
  styleUrls: ['./list-jobs-admin.component.css']
})
export class ListJobsAdminComponent implements OnInit {
  jobs: any;

  constructor(private jobService: JobsService) {}

  getAllJobs() {
    this.jobService.getAllJobs().subscribe(data => {
      this.jobs = data;
    });
  }
  ngOnInit() {
    this.getAllJobs();
  }
}
