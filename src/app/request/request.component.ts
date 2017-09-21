import { Component }                            from '@angular/core';

@Component({
  selector: 'request',
  templateUrl: 'request.component.html'
})
export class RequestComponent {
  showRequestForm = false;

  toggleShowRequest(): void {
    this.showRequestForm = !this.showRequestForm;
  }
}
