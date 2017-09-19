import { Component }                            from '@angular/core';

@Component({
  selector: 'request',
  templateUrl: 'app.component.html'
})
export class RequestComponent {
  showRequestForm = false;

  toggleShowRequest(): void {
    this.showRequestForm = !this.showRequestForm;
  }
}
