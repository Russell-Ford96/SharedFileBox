import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';

import { AuthService }                          from './auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginFormComponent implements OnInit {
    submitted = false;
    loginForm: FormGroup;
    loginCredentials: any;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.buildForm();
    }

    onSubmit() {
        this.submitted = true;
        this.loginCredentials = this.loginForm.value;
        this.save();
    }
    save(): void {
        var token = this.authService.login(this.loginCredentials)
                        .then(token => this.storeToken(token));
    }
    storeToken(token: string): void {
        if(token == '') {
            alert("Invalid login!");
        } else {
            localStorage.setItem("jwt", token);
            this.router.navigate(['/admin']);
            this.authService.hasToken = true;
        }
    }
    cancel(): void {
        console.log("hit cancel");
    }
    buildForm(): void {
        this.loginForm = this.fb.group({
            'email': ['', [
                Validators.required
                ]
            ],
            'password': ['', [
                Validators.required,
                Validators.minLength(8)
                ]
            ]
        });
        this.loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
    onValueChanged(data?: any) {
        if (!this.loginForm) { return; }
        const form = this.loginForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    formErrors = {
        'email': '',
        'password': ''
    };
    validationMessages = {
        'email': {
            'required': 'Email is required.'
        },
        'password': {
            'required': 'Password is required.',
            'minlength': 'Minimum characters is 8.'
        }
    };
}
