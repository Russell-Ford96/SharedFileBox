import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';

import { AuthService }                          from './auth.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'

})
export class LoginFormComponent {
    constructor(
        private auth: AuthService
    ) {}
}
