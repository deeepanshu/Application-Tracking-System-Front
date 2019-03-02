import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import getLoginRoles from '../../types/loginRoles.interface';
import getRouteFromRole from '../../types/roleRoute.interface';
import { Subscription } from 'rxjs';

const helper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authListenerSubs: Subscription;
  //kGkUh1ACa1
  isUserAuthenticated = false;
  loginForm = new FormGroup({
    email: new FormControl('d@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('qwerasdf', [Validators.required])
  });

  login() {
    const loginData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(loginData).subscribe((response: Login) => {
      if (response.success) {
        const decoded = helper.decodeToken(response.token);
        if (decoded) {
          if (
            decoded.role === getLoginRoles().ROLE_ADMIN ||
            decoded.role === getLoginRoles().ROLE_CANDIDATE ||
            decoded.role === getLoginRoles().ROLE_INTERVIEWER
          ) {
            this.router.navigate([getRouteFromRole()[decoded.role]]);
            localStorage.setItem('token', response.token);
          }
        }
      } else {
        alert('FAILED');
      }
    });
  }

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    // this.isUserAuthenticated = this.authService.getIsAuth();
    // console.log('isUserAuthenticated', this.isUserAuthenticated);
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      // console.log('isAuthenticated', isAuthenticated);
    });
  }

}