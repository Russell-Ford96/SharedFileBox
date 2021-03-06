import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_TRANSITION } from '../../../app.animation';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'vr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/']);
    return !this.auth.isAuthenticated();
  }

}
