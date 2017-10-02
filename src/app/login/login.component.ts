import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';

import { AuthService }                          from './auth.service';

@Component({
    selector: 'login',
    template: '<button (click)="auth.login()">Login</button>'
})
export class LoginFormComponent {
    constructor(
        private auth: AuthService
    ) {}
}
