import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import * as moment from 'moment';
import { ScrollbarComponent, scrollbarOptions } from '../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../app.animation';
import { AppService } from '../../app.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { AppSocketService } from '../../app.socket.service';
import { trigger, state, style, animate, transition, stagger, query } from '@angular/animations';



@Component({
  selector: 'botchats',
  templateUrl:'./botchats.component.html',
  styleUrls: ['./botchats.component.scss', ],
  host: { '[@routeTransition]': ''},
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

export class BotChatsComponent implements OnInit, OnDestroy, AfterViewChecked {

  userid: string;
  mainScrollbarElem: any;
  scrollbar: any;

  sendData: any;
  theData: any = [];
  showDetails: boolean = true;
  colspanList: number = 4;
  heightList: number = 800;
  colspanDetail: number = 8;
  showList: boolean = true;
  activeMsg: any;
  newMessage: string;
  //animations
  state: string = '*';
  activeMsgGlobal: string = '';
  //chats
  botchatData: any = [];



  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;


  constructor(private cd: ChangeDetectorRef,
              private appService: AppService,
              private auth: AuthService,
              private socketService: AppSocketService, )
              {}



  ngOnInit(){

    this.appService.getBotchats()
      .subscribe(data => {
        this.botchatData = data.splice(-50)
        this.botchatData.sort(function compare(a, b) {
          var A = +new Date(a.datetime);
          var B = +new Date(b.datetime);
          return A - B;
        }).reverse();
        this.activeMsg = this.botchatData[0];
        this.cd.detectChanges();

     });
    // socket
    // this.socketService.getMessages()
    //   .subscribe((message: any) => {
    //     this.getData();
    //     this.cd.detectChanges();
    //   })
  }




  onResize(wdwidth, wdHeight){
    /* xs */
    if(wdwidth < 768){
      if(this.showDetails == true){
        this.colspanList = 0;
        this.colspanDetail = 12;
      }
      else{
        this.colspanList = 12;
        this.colspanDetail = 0;
      }
    }
    /* sm */
    if(wdwidth >= 768 && wdwidth < 992){
      this.colspanList = 5;
      this.colspanDetail = 7;
    }
    /* md */
    if(wdwidth >= 992 && wdwidth < 1200){
      this.colspanList = 4;
      this.colspanDetail = 8;
    }
    /* lg */
    if(wdwidth >= 1200){
      this.colspanList = 4;
      this.colspanDetail = 8;
    }
  }


  OnShowList(){
    if((this.showDetails == true) && (this.colspanList == 12)){
      this.colspanList = 0;
      this.colspanDetail = 12;
      return false;
    }
    else{
      return true;
    }
  }


// ------//

  ngOnDestroy() {
    if(this.mainScrollbarElem != undefined){
      Scrollbar.init(this.mainScrollbarElem, scrollbarOptions);
    }
  }

  ngAfterViewChecked(){
    this.mainScrollbarElem = document.getElementById('main-scrollbar');
    this.scrollbar = Scrollbar.get(this.mainScrollbarElem);
    if(this.scrollbar){this.scrollbar.destroy();
    }

    this.onResize(innerWidth, innerHeight);
  }


  onDetectChanges(){
      if (!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    }

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

    //close detail
    setCloseDetails(){
      this.state = 'close';
    }

    setActiveMsg(item){
      if(this.activeMsg != item){
        this.animateDetailsIn()
      }
      this.showDetails = true;
      this.activeMsgGlobal = item;
    }








}
