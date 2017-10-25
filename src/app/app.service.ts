import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {toPromise} from "rxjs/operator/toPromise";
import {Observable} from 'rxjs/Observable';
import {RequestData} from './pages/request/requestdata';

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

  createEmail(formData: any): Promise<any> {
    return this.http.post('api/email', JSON.stringify(formData), {headers: this.headers})
      .toPromise()
      .then(response =>  response)
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

  getDocRequests(pageID:any, createdBy: string): Promise<any> {
      return this.http.get('api/getreq/' + pageID + '/' + createdBy , {headers: this.headers})
      .toPromise()
      .then(response => response )
      .catch(this.handleError);

  }

  getImage(createdBy: string, refnumb:string, file: string): Promise<any>{
      return this.http.get('api/getimage/'+ createdBy + '/' + refnumb + '/' + file,{headers: this.headers})
      .toPromise()
      .then(response => response )
      .catch(this.handleError);
  }

 /* getImage(url: string): Observable<File>{
    return this.http.get('api/getimage/'+ url,{ responseType: ResponseContentType.Blob})
      .map((res: Response) => res.blob());
  } */

  getAllRequestData(createdBy: string): Observable<RequestData[]> {
    return this.http.get('api/reqdata/' + createdBy, {headers: this.headers})
         .map(response => response.json() as RequestData[]);
  }

  getRefNumbRequest(refNumb:any):Promise<any>{
      return this.http.get('api/request/detail/'+ refNumb , {headers: this.headers})
        .toPromise()
        .then(response =>response)
        .catch(this.handleError);
  }


  getMaxPage(createdBy: string): Promise<any>{
      return this.http.get('api/maxpage/' + createdBy, {headers: this.headers})
        .toPromise()
        .then(response => response  )
        .catch(this.handleError);
  }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
