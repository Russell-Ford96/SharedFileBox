import { Component }                            from '@angular/core';

@Component({
  selector: 'request',
  templateUrl: 'request.component.html'
})
export class RequestComponent {

  showRequestForm = false;
    dummyRequest = {
        _id: "1234567890fakeID",
        email: "test@example.com",
        phone: "+19545555555",
        docArray: [
            { name: "ourNameForTheDoc",
                attachment: "nameOfFileOnServer.ext"
            }
        ],
        thanks: "thank you message"
    };
    dummyTableData = [this.dummyRequest, this.dummyRequest];

  toggleShowRequest(): void {
    this.showRequestForm = !this.showRequestForm;
  }
}
