import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    const tokenPayLoad = helper.decodeToken(token);
    if (!this.authService.getIsAuth() || tokenPayLoad.role !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
