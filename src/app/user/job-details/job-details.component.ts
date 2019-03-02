import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { JobsService } from 'src/app/services/jobs.service';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService} from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import getLoginRoles from 'src/app/types/loginRoles.interface';
import { CandidateService } from 'src/app/services/candidate.service';
const helper = new JwtHelperService();
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobId: string = '';
  job: Job;
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
    
    if(this.authService.getIsAuth()){
      let token = this.authService.getToken();
      if(token) {
        let decoded = helper.decodeToken(token);
        if(decoded.role == getLoginRoles().ROLE_CANDIDATE) {
          this.candidateService.apply();
          console.log("Logged In");
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
    if(this.jobId) {
      this.jobService.getJobById(this.jobId).subscribe((response) => {
        this.job = response;
      })
    }
  }

}
