import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthResolve implements Resolve<any> {
    constructor(
        private authService: AuthService,
        private router: Router,
    ){ }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let token = localStorage.getItem('jwt');
        return this.authService.verifyToken(token).then(res => {
            if (res) {
                return true;
            } else { // id not found
                if(route.url[0].path == 'login')
                    this.router.navigate(['/login']);
                return false;
            }
        });
    }
}
