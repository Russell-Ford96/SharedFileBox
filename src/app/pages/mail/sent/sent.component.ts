import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewChecked, HostListener, NgZone } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ScrollbarComponent, scrollbarOptions } from '../../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import {AppService} from "../../../app.service";
import {AuthService} from "../../../auth/auth.service";
import { Observable } from 'rxjs/Rx';
import {AnonymousSubscription} from "rxjs/Subscription";
import { AppSocketService } from  "../../../app.socket.service";
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';


@Component({
  selector: 'vr-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss'],
  host: { '[@routeTransition]': '' },

  animations: [...ROUTE_TRANSITION,
    trigger('cardslider', [
      transition('* => *', [
        query('mat-card', style({ transform: 'translateX(-100%)'})),
        query('mat-card',
          stagger('600ms', [
            animate('900ms', style({ transform: 'translateX(0)'}))
            ]))
          ])
        ]),
    ]
})


export class SentComponent implements OnInit, OnDestroy, AfterViewChecked {

  timerSubscription: AnonymousSubscription;
  mainScrollbarElem: any;
  scrollbar: any;
  userid: string;
  sentData: any;
  theData : any;

  chats: any[];
  activeMsg: any;
  newMessage: string;

  showList: boolean;
  showCard: boolean;
  show = false;


  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;

  constructor(private cd: ChangeDetectorRef,
              private appService: AppService,
              private auth: AuthService,
              private socketService: AppSocketService,
              private ngZone: NgZone,
            ) {
                window.onresize = (e) =>{
                  this.ngZone.run(() =>{
                    if(window.innerWidth >= 750 && this.showCard == true){
                      this.showListandCard();
                    }
                    if(window.innerWidth >= 750 && this.showCard == false){
                      this.showListOnly();
                    }
                    if(window.innerWidth <= 750 && this.showCard == true){
                      this.showCardOnly();
                    }
                    if(window.innerWidth <= 750 && this.showCard == false){
                      this.showListOnly();
                    }
                  })
                }
            }



  ngAfterViewChecked(){
    this.mainScrollbarElem = document.getElementById('main-scrollbar');
    this.scrollbar = Scrollbar.get(this.mainScrollbarElem);
    if(this.scrollbar){this.scrollbar.destroy();
    }
  }

  ngOnInit() {
    this.showListOnly();
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


  // public subscribeToData(id: string)
  // {
  //  this.userid = id;
  //  this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.requestByUser(this.userid));
  // }



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
    console.log('@@@mainscrollbarelem ondestroy', this.mainScrollbarElem)
    if(this.mainScrollbarElem != undefined){
      Scrollbar.init(this.mainScrollbarElem, scrollbarOptions);
    }
  }

//message card on small screens
  setActiveMsg(item) {
    this.activeMsg = item;
    if(innerWidth >= 750){
      this.showList = true;
      this.showCard = true;
    }
    else if(innerWidth <= 750){
      this.showList = false;
      this.showCard = true;
    }
  }

  closeCard(): void{
    this.showCard = false;
    this.showList = true;
    this.show = !this.show;
  }

  showListOnly():void{
      this.showCard = false;
      this.showList = true;
  }

  showCardOnly():void{
      this.showCard = true;
      this.showList = false;
  }

  showListandCard():void{
      this.showCard = true;
      this.showList = true;
  }


  showCardWide():void{
      this.showCard = true;
      this.showList = false;
  }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }






}
