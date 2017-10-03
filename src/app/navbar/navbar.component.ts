import {Component, OnInit} from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    viewingReceived = true;
    showSideBar= false;

    constructor(
        private authService: AuthService
    ) {}


    toggleSideBar(): void {
        this.showSideBar = !this.showSideBar;
    }

    toggleView(status: boolean): void {
        this.viewingReceived = status;
    }

    logout() {
        this.authService.logout();
    }
}
