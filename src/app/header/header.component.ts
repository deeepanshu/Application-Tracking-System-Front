import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  //kGkUh1ACa1
  isUserAuthenticated = false;
  constructor(private authService: AuthService, private router: Router) { }

  logout(){
    this.authService.logout();
  }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    console.log(this.isUserAuthenticated);
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      console.log(this.isUserAuthenticated);
    });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
