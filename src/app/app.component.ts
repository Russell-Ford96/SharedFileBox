import { Component }                            from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent { 
    showRequestForm = false;

    toggleShowRequest(): void {
        this.showRequestForm = !this.showRequestForm;
    }
}
