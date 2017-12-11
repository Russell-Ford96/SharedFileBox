import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
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




@Component({
  selector: 'vr-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class SentComponent implements OnInit, OnDestroy, AfterViewChecked {

  timerSubscription: AnonymousSubscription;
  mainScrollbarElem: any;
  scrollbar: any;
  userid: string;
  sentData: any;
  theData: any;
  showDetails: boolean = false;
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
    console.log('### mainscrollbarelemonInit', this.mainScrollbarElem);
    this.scrollbar = Scrollbar.get(this.mainScrollbarElem);
    if(this.scrollbar){this.scrollbar.destroy();
    }

    this.onResize(innerWidth,innerHeight);
  }

  onResize(wdwidth,wdHeight) {

    console.log('onResize');

    console.log("wdHeight ",wdHeight);



    if(wdwidth < 768){
    /* xs */
      console.log('xs ', wdwidth);
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
       console.log('sm', wdwidth);
       this.colspanList = 5;
       this.colspanDetail = 7;
     }
    /* md */
     if(wdwidth >= 992 && wdwidth < 1200){
     /* md */
      this.colspanList = 4;
      this.colspanDetail = 8;
       console.log('md', wdwidth);
     }
    /* lg */
    if(wdwidth >= 1200){
    /* lg */
      this.colspanList = 4;
      this.colspanDetail = 8;
      console.log('lg', wdwidth);
    }

    console.log(wdwidth);

  }

  OnShowList(){
    if((this.showDetails == true)&&(this.colspanList == 12)){

        //this.showList = false;
        this.colspanList = 0;
        this.colspanDetail = 12;
        console.log("OnShowList", false);
        return false;

    }else{
      console.log("OnShowList", true);
      return true;
    }

  }

  setCloseDetails(){
    this.showDetails = false;
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
    console.log("**************************************");
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

      console.log("*******************************");
      console.log(this.theData);

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
    this.showDetails = true;
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
    console.log('@@@mainscrollbarelem ondestroy', this.mainScrollbarElem)
    if(this.mainScrollbarElem != undefined){
      Scrollbar.init(this.mainScrollbarElem, scrollbarOptions);
    }
  }



//message card on small screens
  onClose(): void{
    this.activeMsg = '';
  }






}
