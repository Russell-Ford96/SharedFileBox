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
      transition('show => hide', [
      animate(350, keyframes([
        style({transform: 'translateX(0%)' }),
        style({transform: 'translateX(100%)' }),
      ]))
    ])
  ])


  ]
})



export class SentComponent implements OnInit, OnDestroy, AfterViewChecked {


  state: string = '*';
  activeMsgGlobal :string = '';

  animateDetailsIn(){
    this.state = this.state === 'hide'? 'show': 'hide';
    console.log('****', this.state)
  }

  animateDetailsIn2(){
    console.log('#####@', this.state)
    if(this.state === 'close'){
      this.activeMsg = null;
    }
    if(this.state === 'hide'){
      this.state = 'show';
      this.activeMsg = this.activeMsgGlobal;
      // this.activeMsg = item;
    }
  }



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



  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;

  constructor(private cd: ChangeDetectorRef,
              private appService: AppService,
              private auth: AuthService,
              private socketService: AppSocketService,
            ) {}

  ngAfterViewChecked(){
    this.mainScrollbarElem = document.getElementById('main-scrollbar');
    //console.log('### mainscrollbarelemonInit', this.mainScrollbarElem);
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
        // this.animateDetails();
      }else{
      this.colspanList = 12;
      this.colspanDetail = 0;
      }
    }
    /* sm */
     if(wdwidth >= 768 && wdwidth < 992){
     /* sm */
       //console.log('sm', wdwidth);
       this.colspanList = 5;
       this.colspanDetail = 7;
     }
    /* md */
     if(wdwidth >= 992 && wdwidth < 1200){
     /* md */
      this.colspanList = 4;
      this.colspanDetail = 8;
       //console.log('md', wdwidth);
     }
    /* lg */
    if(wdwidth >= 1200){
    /* lg */
      this.colspanList = 4;
      this.colspanDetail = 8;
      //console.log('lg', wdwidth);
    }

    //console.log(wdwidth);

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

  setCloseDetails(){
    // this.showDetails = false;

    this.state = 'close';
  }

  ngOnInit() {
    //socket
    this.socketService
      .getMessages()
      .subscribe((message: any) => {
       this.getData();
      });

      this.getData();
      this.cd.detectChanges();
  }


  getData(){
    //console.log("**************************************");
    if(this.auth.userProfile){
        this.userid = this.auth.userProfile.sub.split("|")[1];
        this.requestByUser(this.userid);
        this.cd.detectChanges();
    }else{
        this.auth.getProfile((err, profile) => {
        this.userid = profile.sub.split("|")[1];
        this.requestByUser(this.userid);
        this.cd.detectChanges();
      });
    }
  }


  requestByUser(id: string ){
    this.userid = id;

    this.appService.getAllRequestData(id).subscribe(results => {

      this.theData = results;

      //console.log("*******************************");
      //console.log(this.theData);

      this.theData.sort(function compare(a, b) {
        var dateA = +new Date(a.datetime);
        var dateB = +new Date(b.datetime);
        return dateA - dateB;
      }).reverse();
      this.activeMsg = this.theData[0];
      //console.log(this.theData);
    });
  }


  setActiveMsg(item) {
    if(this.activeMsg != item){
        this.animateDetailsIn();
    }
    this.showDetails = true;
    //if(this.state === 'show'){
      this.activeMsgGlobal = item;
    //}
  }


  send() {
    if (this.newMessage) {
      this.chats[0].messages.push({
        message: this.newMessage,
        when: moment(),
        who: 'me'
      });
      this.newMessage = '';
      //this.cd.markForCheck();
      this.cd.detectChanges();
      this.chatScroll.scrollbarRef.scrollIntoView(this.scrollToBottomElem.nativeElement, {
        alignToTop: false
      });

      setTimeout(() => {
        this.chats[0].messages.push({
          message: 'Oh look! I can even answer you. ;)',
          when: moment(),
          who: 'partner'
        });
        //this.cd.markForCheck();
        this.cd.detectChanges();

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
    //console.log('@@@mainscrollbarelem ondestroy', this.mainScrollbarElem)
    if(this.mainScrollbarElem != undefined){
      Scrollbar.init(this.mainScrollbarElem, scrollbarOptions);
    }
  }

//message card on small screens
  onClose(): void{
    this.activeMsg = '';
  }






}
