import * as _ from 'lodash';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription} from "rxjs/Subscription";
import { AppSocketService } from '../../../app.socket.service';
import { AuthService } from '../../../auth/auth.service';
import { AppService } from '../../../app.service';



@Component({
  selector: 'vr-mail-inbox',
  templateUrl: 'inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' },



})



export class InboxComponent implements OnInit{

  timerSubscription: AnonymousSubscription;
  userid: string;
  theData : any;
  activeMsg: any;
  uploaded: any;
  latestDocTime = null;
  sentData: any;


  constructor( private appService: AppService,
               private auth: AuthService,
               private socketService: AppSocketService,
               private cdr: ChangeDetectorRef,){}

  ngOnInit(){

    this.getData();
    // This service is to update the data in real time through socket
    this.socketService
      .getMessages()
      .subscribe((message: any) => {
        console.log(message);
        console.log(" *********** On Request Component ********** ");
        this.getData();
        this.cdr.detectChanges();
      });


  }

  getData(){
    if(this.auth.userProfile){
      this.userid = this.auth.userProfile.sub.split("|")[1];
      this.userUpload(this.userid);
    }else{
      this.auth.getProfile((err, profile) => {
        this.userid = profile.sub.split("|")[1];
        this.userUpload(this.userid);

      });
    }
  }

  userUpload(id:string){
    this.userid = id;


    this.appService.getRequestInbox(id).subscribe(results => {

      //this.subscribeToData(this.userid);
      this.theData = results;


        for(let i=0;i<this.theData.length; i++){
        let documentArray= this.theData[i].docArray;

        for (let doc of documentArray) {
          if(doc.dateTime){
              this.theData[i].latestDocTime=+new Date(doc.dateTime);
              //console.log(this.theData[i].latestDocTime);
          }
        }

      }

      this.sentData= _.sortBy(this.theData,'latestDocTime').reverse();
      this.activeMsg = this.sentData[0];

    });


  }

  // public subscribeToData(id: string)
  // {
  //   this.userid = id;
  //   this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.userUpload(this.userid));
  // }

  setActiveMsg(item) {
    this.activeMsg = item;

  }





  }
