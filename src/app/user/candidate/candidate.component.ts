import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  loading: boolean= false;
  private authListenerSubs: Subscription;
  isUserAuthenticated = false;
  candidate: any;
  applications: any[] = [];

  constructor(private authService: AuthService, private router: Router, private candidateService: CandidateService) {}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
    this.loading = true;
    this.candidateService.getProfile().subscribe((response) => {
      this.candidate = response;
      this.loading = false;
    });
    this.candidateService.getProfileApplications().subscribe((response) => {
      this.applications = response;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  getFileUrl(fileName)  {
    return `/api/candidate/get/assets/${fileName}`;
  }

}
