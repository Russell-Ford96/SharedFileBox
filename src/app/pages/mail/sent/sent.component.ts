import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ScrollbarComponent, scrollbarOptions } from '../../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import {AppService} from "../../../app.service";
import {AuthService} from "../../../auth/auth.service";
import { Observable } from 'rxjs/Rx';
import {AnonymousSubscription} from "rxjs/Subscription";
import { AppSocketService } from  "../../../app.socket.service";//

@Component({
  selector: 'vr-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class SentComponent implements OnInit, OnDestroy {

  timerSubscription: AnonymousSubscription;
  mainScrollbarElem: any;
  scrollbar: any;
  userid: string;
  sentData: any;
  theData : any;

  chats: any[];
  activeMsg: any;
  newMessage: string;

  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;

  constructor(private cd: ChangeDetectorRef,
              private appService: AppService,
              private auth: AuthService,
              private socketService: AppSocketService,//
              ) { }

  ngOnInit() {
    // this.chats = _.sortBy(chatDemoData, 'lastMessageTime').reverse();
    this.mainScrollbarElem = document.getElementById('main-scrollbar');
    this.scrollbar = Scrollbar.get(this.mainScrollbarElem);
    if(this.scrollbar){this.scrollbar.destroy();}

    //socket
    this.socketService
      .getMessages()
      .subscribe((message: any) => {
       this.getData();
        this.cd.detectChanges();
      });
      this.getData();
  }

  getData(){
    if(this.auth.userProfile){
        this.userid = this.auth.userProfile.sub.split("|")[1];
        this.requestByUser(this.userid);
    }else{
        this.auth.getProfile((err, profile) => {
        this.userid = profile.sub.split("|")[1];
        this.requestByUser(this.userid);
      });
    }
  }


  requestByUser(id: string ){
    this.userid = id;

    this.appService.getAllRequestData(id).subscribe(results => {

      // this.subscribeToData(this.userid);//
      this.theData = results;

      this.theData.sort(function compare(a, b) {
        var dateA = +new Date(a.datetime);
        var dateB = +new Date(b.datetime);
        return dateA - dateB;
      }).reverse();
      this.activeMsg = this.theData[0];
      //console.log(this.theData);
    });
  }


  public subscribeToData(id: string)
  {
    this.userid = id;
    // this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.requestByUser(this.userid));
  } 


  setActiveMsg(item) {
    this.activeMsg = item;

  }

  send() {
    if (this.newMessage) {
      this.chats[0].messages.push({
        message: this.newMessage,
        when: moment(),
        who: 'me'
      });

      this.newMessage = '';

      this.cd.markForCheck();

      this.chatScroll.scrollbarRef.scrollIntoView(this.scrollToBottomElem.nativeElement, {
        alignToTop: false
      });

      setTimeout(() => {
        this.chats[0].messages.push({
          message: 'Oh look! I can even answer you. ;)',
          when: moment(),
          who: 'partner'
        });

        this.cd.markForCheck();

        this.chatScroll.scrollbarRef.scrollIntoView(this.scrollToBottomElem.nativeElement, {
          alignToTop: false
        });
      }, 1000)
    }
  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }

  ngOnDestroy() {
    Scrollbar.init(this.mainScrollbarElem, scrollbarOptions);
  }
}
