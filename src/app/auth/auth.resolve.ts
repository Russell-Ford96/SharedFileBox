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
        return true;
    }
}
