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
    if(!token) {
      return true;
    }else {
      const tokenPayload = helper.decodeToken(token);
      if(!this.authService.getIsAuth()){
        return true;
      } else {
        if(tokenPayload.role === getLoginRoles().ROLE_ADMIN || tokenPayload.role === getLoginRoles().ROLE_CANDIDATE || tokenPayload.role === getLoginRoles().ROLE_INTERVIEWER){
          this.router.navigate([getRouteFromRole()[tokenPayload.role]]);
          return false;
        }
        else {
          return true;
        }
      }
    }
  }
}
