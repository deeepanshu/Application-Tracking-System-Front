import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import getLoginRoles from "../types/loginRoles.interface";
import getRouteFromRole from "../types/roleRoute.interface";

const helper = new JwtHelperService();

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  isUserAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }


  jumpToProfile(event) {
    this.authService.jumpToProfile();
  }


  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    console.log(this.isUserAuthenticated);
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
        console.log(this.isUserAuthenticated);
      });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
