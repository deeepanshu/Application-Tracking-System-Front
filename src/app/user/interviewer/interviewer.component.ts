import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { InterviewersService } from "../../services/interviewers.service";

@Component({
  selector: "app-interviewer",
  templateUrl: "./interviewer.component.html",
  styleUrls: ["./interviewer.component.css"]
})
export class InterviewerComponent implements OnInit {
  loading: boolean = false;
  interviews: any;
  private authListenerSubs: Subscription;
  isUserAuthenticated = false;

  step = 1;

  constructor(
    private authService: AuthService,
    private router: Router,
    private interviewerService: InterviewersService
  ) {}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
        console.log(isAuthenticated);
      });
    this.loading = true;
    this.interviewerService.getInterviews().subscribe(response => {
      this.interviews = response;
      console.log(this.interviews);
      this.loading = false;
    });
  }
  takeInterview(event, jobId, candidateId) {
    console.log(jobId, candidateId);
    this.router.navigate([`interviewer/interview/${jobId}/${candidateId}`])
    this.step += 1;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
