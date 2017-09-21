import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(localStorage.getItem('jwt'));
        if (localStorage.getItem('jwt') != null) {
            if((route.url[0].path == 'login') || (route.url[0].path == 'register')) {
                //logged in so redirect to profile
                this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url }});
            }
            // just checking if they have a token for now
            // logged in so return true
            return true;
        } else if(route.url[0].path == 'register') {
            return true;
        } else if(route.url[0].path == 'login') {
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}
