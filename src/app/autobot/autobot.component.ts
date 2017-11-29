import { Component, OnInit, ChangeDetectorRef, trigger, state, style, transition, animate } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AppService} from '../app.service';

@Component({
  selector: 'vr-autobot',
  templateUrl: './autobot.component.html',
  styleUrls: ['./autobot.component.scss'],
  animations:[
    trigger('messageChat',[
      state('in',style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-300px)'
        }),
        animate(300)])
    ])
  ]
})
export class AutobotComponent implements OnInit {
  audio = new Audio();
  state = 'normal';
  url: any;
  bot: any;
  index: number;
  showtime: number;
  avatarService = '../../assets/avatar-chica.png';
  itemsBot:any[] = [{}];
  newMessage: string;

  constructor(
    private appService: AppService,
    private cdr:ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.url = route.params.map(p => p.url);
    this.audio.src = "../../assets/send.wav";
    this.audio.load();
    this.index = -1;
    this.showtime = 100;
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.route.data
      .subscribe((data: { bot: any }) => {
        this.bot = data.bot;

        for (var doc in this.bot.itemArray) {

          this.bot.itemArray[doc].docIndex = doc;
          this.bot.itemArray[doc].show = false;
        }
      });

      this.messageSimulation();

  }

  private send() {
    if (this.newMessage) {
      // this.itemsBot.push({
      //   message: this.newMessage,
      //   when: moment(),
      //   who: 'me'
      // });
      var i = this.itemsBot.length + 1;
      this.itemsBot.push( {
                      'avatar': '../../assets/tiger.jpeg',
                      'name': 'Client',
                      'user': 'client',
                      'msj': this.newMessage,
                      'date': new Date(),
                      'file': false,
                      'showtime': 700,
                      'show': false,
                      'docIndex': i
                    });

      this.newMessage = '';
      this.audio.play();
      this.cdr.detectChanges();
      this.sendMessgeBot();

      // this.cd.markForCheck();
      //
      // this.chatScroll.scrollbarRef.scrollIntoView(this.scrollToBottomElem.nativeElement, {
      //   alignToTop: false
      // });

      // setTimeout(() => {
      //   this.chats[0].messages.push({
      //     message: 'Oh look! I can even answer you. ;)',
      //     when: moment(),
      //     who: 'partner'
      //   });
      //
      //   this.cd.markForCheck();
      //
      //   this.chatScroll.scrollbarRef.scrollIntoView(this.scrollToBottomElem.nativeElement, {
      //     alignToTop: false
      //   });
      // }, 1000)
    }
  }

  private sendMessgeBot(){
      if(this.bot.itemArray.length > this.index){

          this.showtime = this.showtime + 700;
              setTimeout(() => {
                  console.log(this.showtime);
                  this.itemsBot.push( {
                                  'avatar': this.avatarService,
                                  'name': 'Eva',
                                  'user': 'bot',
                                  'msj': this.bot.itemArray[this.index].name,
                                  'date': new Date(),
                                  'file': this.bot.itemArray[this.index].file,
                                  'showtime': this.showtime,
                                  'show': false,
                                  'docIndex': this.index
                                });
                  this.index++;
                  console.log(this.itemsBot[0]);


                  this.audio.play();
                  this.cdr.detectChanges();
              }, this.showtime);
      }
  }

  private messageSimulation() {
    if(this.bot.itemArray){
      console.log("BOT messageSimulation  _------------------_");
      console.log(this.bot.itemArray[0].name);
      this.itemsBot.splice(0, 1);

      this.index = 0;
      this.itemsBot = [];

      this.sendMessgeBot();
      // for (let item in this.bot.itemArray) {
      //
      //   if(this.bot.itemArray[item].file){
      //    i++;
      //   }           showtime = showtime + 700;
      //             setTimeout(() => {
      //                 console.log(showtime);
      //                 this.itemsBot.push( {
      //                                 'avatar': this.avatarService,
      //                                 'name': 'Eva',
      //                                 'user': 'bot',
      //                                 'msj': this.bot.itemArray[item].name,
      //                                 'date': new Date(),
      //                                 'file': this.bot.itemArray[item].file,
      //                                 'showtime': showtime,
      //                                 'show': false,
      //                                 'docIndex': i
      //                               });
      //                 console.log(this.itemsBot[0]);
      //
      //
      //                 this.audio.play();
      //                 this.cdr.detectChanges();
      //             }, showtime);
      //
      // }

    }

  }


  // showMessage(){
  //
  //   console.log("showLoginForm app");
  //   if(this.state == 'one'){
  //   setTimeout(() => {this.state = 'one'
  //     setTimeout(() => {this.state = 'two'
  //     setTimeout(() => {this.state = 'three'
  //                     setTimeout(() => {
  //                       this.state = 'four'
  //                         setTimeout(() => this.state = 'five', 300);
  //                     }, 320);
  //                   }, 400);
  //                 },150);
  //               },10);
  //   } else {
  //   setTimeout(() => {this.state = 'five'
  //     setTimeout(() => {this.state = 'four'
  //     setTimeout(() => {this.state = 'three'
  //                     setTimeout(() => {
  //                       this.state = 'two'
  //                         setTimeout(() => this.state = 'one', 300);
  //                     }, 320);
  //                   }, 400);
  //                 },150);
  //               },10);
  //   }
  //
  //
  // }

}
