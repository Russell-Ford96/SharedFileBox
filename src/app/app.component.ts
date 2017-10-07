import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }
}
