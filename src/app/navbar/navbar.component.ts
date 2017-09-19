import { Component }                            from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent { 
    viewingReceived = true;

    toggleView(status: boolean): void {
        this.viewingReceived = status;
    }
}
