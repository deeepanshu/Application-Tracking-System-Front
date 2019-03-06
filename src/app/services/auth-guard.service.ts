import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import getLoginRoles from '../types/loginRoles.interface';
import getRouteFromRole from '../types/roleRoute.interface';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken();
    if ( token ) {
      if (helper.isTokenExpired(token)) {
        return true;
      } else {
        this.authService.jumpToProfile();
        return false;
      }
    }
    return true;
  }
}
