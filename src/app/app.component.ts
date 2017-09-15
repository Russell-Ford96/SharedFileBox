import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    private headers = new Headers({'Content-Type': 'application/json'});


    login(formData: any): Promise<any> {
        return this.http.post('api/create', JSON.stringify(formData), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
}
