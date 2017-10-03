import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "./login/auth.service";
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
        //return this.authService.isAuthenticated();
    }
}
