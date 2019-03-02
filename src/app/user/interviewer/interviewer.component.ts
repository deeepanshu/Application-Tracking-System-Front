import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.css']
})
export class InterviewerComponent implements OnInit {

  private authListenerSubs: Subscription;
  isUserAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      console.log(isAuthenticated);
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
