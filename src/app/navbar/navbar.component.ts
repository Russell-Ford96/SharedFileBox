import { Component }                            from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent { 
    viewingReceived = true;

    constructor(
        private authService: AuthService
    ) {}

    toggleView(status: boolean): void {
        this.viewingReceived = status;
    }

    logout() {
        this.authService.logout();
    }
}
