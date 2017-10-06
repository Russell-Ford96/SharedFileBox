import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd} from '@angular/router';
import { AuthService } from "./login/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLoggedIn = this.authService.isAuthenticated();
    if(!isLoggedIn)
      return !isLoggedIn;
    else {
      this.router.navigate(['/dashboard']);
      return true;
    }
  }
}
