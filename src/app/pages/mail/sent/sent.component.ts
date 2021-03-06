import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ScrollbarComponent, scrollbarOptions } from '../../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import {AppService} from "../../../app.service";
import {AuthService} from "../../../auth/auth.service";
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription} from "rxjs/Subscription";
import { AppSocketService } from  "../../../app.socket.service";
import { trigger, state, style, animate, transition, stagger, query, keyframes } from '@angular/animations';



@Component({
  selector: 'vr-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss'],
  host: { '[@routeTransition]': '' },

  animations: [...ROUTE_TRANSITION,
    trigger('popOverState', [
      state('hide',  style({ transform: 'translateX(100%)' })),
      state('close',  style({ transform: 'translateX(100%)' })),
      state('show',  style({ transform: 'translateX(0%)' })),
      transition('* => show', animate('700ms ease')),
      transition('show => close', animate('700ms ease')),
      transition('show => hide', [ animate('700ms ease'),
      ])
    ])
  ]
})



export class SentComponent implements OnInit, OnDestroy, AfterViewChecked {


  timerSubscription: AnonymousSubscription;
  mainScrollbarElem: any;
  scrollbar: any;
  userid: string;
  sentData: any;
  theData: any;
  showDetails: boolean = true;
  colspanList: number = 4;
  heightList: number = 800;
  colspanDetail: number = 8;
  showList: boolean = true;
  chats: any[];
  activeMsg: any = '';
  newMessage: string;
  //animation variables
  state: string = '*';
  activeMsgGlobal: string = '';


  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;

  constructor(private cd: ChangeDetectorRef,
              private appService: AppService,
              private auth: AuthService,
              private socketService: AppSocketService,
            ) {}


  //animations
  animateDetailsIn(){
    this.state = this.state === 'hide'? 'show': 'hide';
  }

  animateDetailsIn2(){
    if(this.state === 'close'){
      this.activeMsg = null;
    }
    if(this.state === 'hide'){
      this.state = 'show';
      this.activeMsg = this.activeMsgGlobal;
    }
  }

  //close details
  setCloseDetails(){
    this.state = 'close';
    this.showDetails = false;
  }


  setActiveMsg(item) {
    if(this.activeMsg != item){
        this.animateDetailsIn();
    }
    this.showDetails = true;
    this.activeMsgGlobal = item;
  }


  ngAfterViewChecked(){
    this.mainScrollbarElem = document.getElementById('main-scrollbar');
    this.scrollbar = Scrollbar.get(this.mainScrollbarElem);
    if(this.scrollbar){this.scrollbar.destroy();
    }

    this.onResize(innerWidth, innerHeight);
  }

  onResize(wdwidth, wdHeight) {

    if(wdwidth < 768){

    /* xs */
      if(this.showDetails == true){
        this.colspanList = 0;
        this.colspanDetail = 12;
      }else{
      this.colspanList = 12;
      this.colspanDetail = 0;
      }
    }
    /* sm */
     if(wdwidth >= 768 && wdwidth < 992){
     /* sm */
       this.colspanList = 5;
       this.colspanDetail = 7;
     }
    /* md */
     if(wdwidth >= 992 && wdwidth < 1200){
     /* md */
      this.colspanList = 4;
      this.colspanDetail = 8;
     }
    /* lg */
    if(wdwidth >= 1200){
    /* lg */
      this.colspanList = 4;
      this.colspanDetail = 8;
    }
  }


  OnShowList(){
    if((this.showDetails == true)&&(this.colspanList == 12)){
        this.colspanList = 0;
        this.colspanDetail = 12;
        return false;
    }else{
      return true;
    }
  }

  onDetectChanges(){
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  ngOnInit() {
    //socket
    this.socketService
      .getMessages()
      .subscribe((message: any) => {
       this.getData();
       this.onDetectChanges();
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

      this.theData = results;

      this.theData.sort(function compare(a, b) {
        var dateA = +new Date(a.datetime);
        var dateB = +new Date(b.datetime);
        return dateA - dateB;
      }).reverse();
      this.activeMsg = this.theData[0];
      this.onDetectChanges();
    });
  }





  send() {
    if (this.newMessage) {
      this.chats[0].messages.push({
        message: this.newMessage,
        when: moment(),
        who: 'me'
      });
      this.newMessage = '';
      this.onDetectChanges();
      this.chatScroll.scrollbarRef.scrollIntoView(this.scrollToBottomElem.nativeElement, {
        alignToTop: false
      });

      setTimeout(() => {
        this.chats[0].messages.push({
          message: 'Oh look! I can even answer you. ;)',
          when: moment(),
          who: 'partner'
        });
        this.onDetectChanges();

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
    if(this.mainScrollbarElem != undefined){
      Scrollbar.init(this.mainScrollbarElem, scrollbarOptions);
    }
  }


  onClose(): void{
    this.activeMsg = '';
  }






}
