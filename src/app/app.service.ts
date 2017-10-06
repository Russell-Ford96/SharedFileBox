import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {toPromise} from "rxjs/operator/toPromise";

@Injectable()
export class AppService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    createRequest(formData: any): Promise<any> {
        return this.http.post('api/create', JSON.stringify(formData), {headers: this.headers})
                    .toPromise()
                    .then(response => response)
                    .catch(this.handleError);
    }

    upload(formData: any): Promise<any> {
        formData._id = "59c173e712e15f23dea3e541";
        formData.attachment = "attachment here";
        return this.http.post('api/upload', JSON.stringify(formData), {headers: this.headers})
                    .toPromise()
                    .then(response => response)
                    .catch(this.handleError);
    }



    getDocRequest(id: any): Promise<any> {
        return this.http.get('api/getdoc/' + id, {headers: this.headers})
                    .toPromise()
                    .then(response => {console.log('req'); return response})
                    .catch(this.handleError);
    }

  getDocRequests(pageID:any): Promise<any> {
    return this.http.get('api/getreq/' + pageID , {headers: this.headers})
      .toPromise()
      .then(response => response  )
      .catch(this.handleError);
  }

  getMaxPage(): Promise<any>{
      return this.http.get('api/maxpage',{headers: this.headers})
        .toPromise()
        .then(response => response  )
        .catch(this.handleError);
  }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
