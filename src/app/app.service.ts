import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    createRequest(formData: any): Promise<any> {
        return this.http.post('api/createRequest', JSON.stringify(formData), {headers: this.headers})
                    .toPromise()
                    .then(response => response)
                    .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
