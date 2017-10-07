import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd} from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLoggedIn = this.authService.isAuthenticated();
    if(!isLoggedIn)
      this.router.navigate(['/login']);
    else
      return isLoggedIn;
  }
}
