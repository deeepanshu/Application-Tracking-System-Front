import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  isUserAuthenticated = false;
  jobs: any = [];
  noOfJobs: number = 0;

  constructor(
    private jobService: JobsService,
    private router: Router,
    private authService: AuthService
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
    this.isUserAuthenticated = this.authService.getIsAuth();
    console.log('isUserAuth', this.isUserAuthenticated);
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      console.log('isUserAuth', this.isUserAuthenticated);
    });
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
