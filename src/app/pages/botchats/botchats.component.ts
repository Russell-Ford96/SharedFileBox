import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ScrollbarComponent, scrollbarOptions } from '../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../app.animation';
import { AppService } from '../../app.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { AppSocketService } from '../../app.socket.service';
import { trigger, state, style, animate, transition, stagger, query } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'botchats',
  templateUrl:'./botchats.component.html',
  styleUrls: ['./botchats.component.scss', ],
  host: { '[@routeTransition]': ''},
  animations: [...ROUTE_TRANSITION, ]
})

export class BotChatsComponent implements OnInit {

  userid: string;
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
  bot_questions: any = [];
  answers: any = [];
  botnames: any = [];


  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;


  constructor(private cd: ChangeDetectorRef,
              private appService: AppService,
              private auth: AuthService,
              private socketService: AppSocketService, )
              {}



  ngOnInit(){

    this.appService.getBotchats()
      .then(results => {
          for(var item = 0; item < results.length; item++){

              if(results[item]['botName'] != undefined) {
                  this.botnames[item] = results[item]['botName']
                  console.log('botname: ', this.botnames[item])
              }
          for(var k = 0; k < results[item]['requests'].length; k++){

              this.bot_questions[k] = results[item]['requests'][k]['question'];
              this.answers[k] = results[item]['requests'][k]['answer'];
              console.log('Q: ', this.bot_questions[k])
              console.log('A:', this.answers[k])
          }
        }
     });


    // socket
    // this.socketService.getMessages()
    //   .subscribe((message: any) => {
    //     this.getData();
    //     this.cd.detectChanges();
    //   })
  }


  setCloseDetails(){
    this.state = 'close';
  }


  setActiveMsg(item){
    if(this.activeMsg != item){}
    this.showDetails = true;
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

  getData(){
    if(this.auth.userProfile){
      this.userid = this.auth.userProfile.sub.split('|')[1];
      this.requestByUser(this.userid);
      this.cd.detectChanges();
    }
    else{
      this.auth.getProfile((err, profile) => {
        this.userid = profile.sub.split('|')[1];
        this.requestByUser(this.userid);
        this.cd.detectChanges();
      });
    }
  }


  requestByUser(id: string){
    console.log('####', 'requestbyuser')
    this.userid = id;
    this.appService.getBotchats()
      .then(results => {
        this.theData = results;
        this.activeMsg = this.theData[0];
    });
  }












}
