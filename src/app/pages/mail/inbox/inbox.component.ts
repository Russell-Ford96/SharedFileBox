import * as _ from 'lodash';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
import {AppService} from '../../../app.service';



@Component({
  selector: 'vr-mail-inbox',
  templateUrl: 'inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' },



})



export class InboxComponent implements OnInit{

  userid: string;
  theData : any;
  activeMsg: any;
  uploaded: any;
  latestDocTime = null;
  sentData: any;


  constructor( private appService: AppService,
               private auth: AuthService){}

  ngOnInit(){

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


    this.appService.getRequestInbox(id).
      then(results=> {
      this.theData = JSON.parse(results._body);

        for(let i=0;i<this.theData.length; i++){
        let documentArray= this.theData[i].docArray;

        for (let doc of documentArray) {
          if(doc.dateTime){
            this.theData[i].latestDocTime=doc.dateTime;

          }
        }

      }

      this.sentData= _.sortBy(this.theData,'latestDocTime').reverse();
      this.activeMsg = this.sentData[0];

    });


  }

  setActiveMsg(item) {
    this.activeMsg = item;

  }





  }


