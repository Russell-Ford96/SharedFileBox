import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {chatDemoData} from "../../chat/chat.demo";
import * as _ from 'lodash';
import * as moment from 'moment';
import { ScrollbarComponent, scrollbarOptions } from '../../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import {AppService} from "../../../app.service";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'vr-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class SentComponent implements OnInit, OnDestroy {

  mainScrollbarElem: any;
  scrollbar: any;
  userid: string;
  sentData: any;

  chats: any[];
  activeMsg: any;
  newMessage: string;

  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;

  constructor(private cd: ChangeDetectorRef,
              private appService: AppService,
              private auth: AuthService) { }

  ngOnInit() {
    this.chats = _.sortBy(chatDemoData, 'lastMessageTime').reverse();

    this.mainScrollbarElem = document.getElementById('main-scrollbar');
    this.scrollbar = Scrollbar.get(this.mainScrollbarElem);
    this.scrollbar.destroy();
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
    let theData : any;

    this.appService.getDocRequests(id).
    then(results=>{
      theData= JSON.parse(results._body);
      this.sentData= _.sortBy(theData,'datetime').reverse();
      this.activeMsg = this.sentData[0];
      console.log(this.sentData);


    });




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
