import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { JobsService } from 'src/app/services/jobs.service';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService} from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import getLoginRoles from 'src/app/types/loginRoles.interface';
import { CandidateService } from 'src/app/services/candidate.service';
import { Subscription } from 'rxjs';
const helper = new JwtHelperService();
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  isUserAuthenticated = false;
  jobId: string = '';
  job: Job;
  alreadyApplied: boolean= false;
  buttonText = "Apply Now";
  constructor(
    private route: ActivatedRoute,
    private jobService: JobsService,
    private authService: AuthService,
    private candidateService: CandidateService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  apply(event) {
    console.log(this.jobId);
    if(this.isUserAuthenticated){
      let token = this.authService.getToken();
      if(token) {
        let decoded = helper.decodeToken(token);
        if(decoded.role == getLoginRoles().ROLE_CANDIDATE) {
          this.candidateService.apply(this.jobId).subscribe((response) => {
            if(response.success){
              this.toastr.success("Successfully Applied!");
            } else {
              this.toastr.error(response.message);
            }
          });
        } else {
          this.toastr.error("Operation Not Allowed");
        }
      }
    } else {
      localStorage.setItem('jobId', this.jobId);
      this.toastr.info('Login to apply!');
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get("jobId");
    this.isUserAuthenticated = this.authService.getIsAuth();
    console.log('isUserAuth', this.isUserAuthenticated);
    // this.jobService.isAlreadyAppliedForJob(this.jobId).subscribe((response) => {
    //   console.log(response);
    //   this.alreadyApplied = response.status;
    //   this.buttonText = response.status? 'Already Applied' : 'Apply Now';
    //   console.log(this.buttonText);
    // })
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      console.log('isUserAuth', this.isUserAuthenticated);
    });
    if(this.jobId) {
      this.jobService.getJobById(this.jobId).subscribe((response) => {
        this.job = response;
      })
    }
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
