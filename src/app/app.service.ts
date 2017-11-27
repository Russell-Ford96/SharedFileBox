import {Component, Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {toPromise} from "rxjs/operator/toPromise";
import {Observable} from 'rxjs/Observable';
import {RequestData} from './pages/request/requestdata';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import * as io from 'socket.io-client';

@Injectable()


export class AppService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public loading = false;
  //private url = 'http://localhost:3100';
  //private socket;

  constructor(private http: Http) {
    //this.socket = io(this.url);
  }


  // public sendMessageBySocket(message) {
  //   console.log("------------------------ sending the message");
  //   console.log(message);
  //   //console.log(this.socket.name);
  //   this.socket.emit('new_message', message);
  // }
  //
  // public getMessagesBySocket = () => {
  //       return Observable.create((observer) => {
  //           this.socket.on('new_message', (message) => {
  //               console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> geting the message");
  //               observer.next(message);
  //           });
  //       });
  // }




  createRequest(formData: any): Promise<any> {
    return this.http.post('api/create', JSON.stringify(formData), { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  isLoading(){
    return this.loading;
  }

  setLoading(loading:boolean){
    this.loading = loading;
  }




  createBot(formData: any): Promise<any> {
    return this.http.post('api/createbot', JSON.stringify(formData), { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  updateBot(formData: any): Promise<any> {
    console.log("app.service->updateBot");
    console.log(formData);
    return this.http.post('api/updatebot', JSON.stringify(formData), { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  createEmail(formData: any): Promise<any> {
    return this.http.post('api/email', JSON.stringify(formData), { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  upload(formData: any): Promise<any> {
    formData._id = "59c173e712e15f23dea3e541";
    formData.attachment = "attachment here";
    return this.http.post('api/upload', JSON.stringify(formData), { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getAllBotData(): Promise<RequestData[]> {
    return this.http.get('api/bots/' , { headers: this.headers })
      .toPromise()
      .then(response => response.json() as RequestData[])
      .catch(this.handleError);
  }

  getDocRequest(id: any): Promise<any> {
    return this.http.get('api/getdoc/' + id, { headers: this.headers })
      .toPromise()
      .then(response => { console.log('req'); return response })
      .catch(this.handleError);
  }


  getDocRequests(createdBy: string): Promise<any> {
      return this.http.get('api/getreq/' + createdBy , {headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);

  }


  getRequestInbox(createdBy: string): Observable<RequestData[]>{
    return this.http.get('api/getinbox/' + createdBy, {headers: this.headers})
      .map(response =>  response.json() as RequestData[])
  }

  getImage(createdBy: string, refnumb:string, file: string): Promise<any>{
      return this.http.get('api/getimage/'+ createdBy + '/' + refnumb + '/' + file,{headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getAllRequestData(createdBy: string): Observable<RequestData[]> {
    return this.http.get('api/reqdata/' + createdBy, {headers: this.headers})
         .map(response =>  response.json() as RequestData[]);
  }

  getRefNumbRequest(refNumb: any): Promise<any> {
    return this.http.get('api/request/detail/' + refNumb, { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getMaxPage(createdBy: string): Promise<any> {
    return this.http.get('api/maxpage/' + createdBy, { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);

    }
}
