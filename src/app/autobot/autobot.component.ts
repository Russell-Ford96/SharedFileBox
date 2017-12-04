import { Component, OnInit, ChangeDetectorRef, trigger, state, style, transition, animate } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { BotRequest } from './bot-request.model';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

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

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:5000/api/upload', itemAlias: "single", autoUpload: true
  });

  audio = new Audio();
  state = 'normal';
  showBot = false;
  fileIndex: number;
  lastindex: number;
  dateUpdate: Date;
  botRequest: BotRequest;
  url: any;
  bot: any;
  index: number;
  showtime: number;
  //botAvatar = '../../assets/avatar-chica.png';
  //botName: string;
  botTyping = ' online';
  itemsBot:any[] = [{}];
  newMessage: string;

  constructor(
    private appService: AppService,
    private cdr:ChangeDetectorRef,
    private route: ActivatedRoute
  ) {

    this.botRequest = new BotRequest();
    this.botRequest.requests = [];
    this.url = route.params.map(p => p.url);

    this.audio.src = "../../assets/send.wav";
    this.audio.load();
    this.index = -1;
    this.showtime = 100;
  }

  ngOnInit() {

    this.route.data
      .subscribe((data: { bot: any }) => {
        this.bot = data.bot;
        //this.botName = this.bot.name;
        this.botRequest.bot = this.bot;

        for (var doc in this.bot.itemArray) {
          this.botRequest.requests.push( {"question":this.bot.itemArray[doc].name, "answer":''} );
          this.bot.itemArray[doc].docIndex = doc;
          if(this.bot.itemArray[doc].file){

          }
          this.bot.itemArray[doc].show = false;
        }
      });

      this.itemsBot.splice(0, 1);

      this.index = 0;
      this.itemsBot = [];

      this.uploader.onBeforeUploadItem = (item: any) => {
        item.withCredentials = false;
        this.uploader.options.additionalParameter = {
          index: item.formData[0].index,
          _id: item.formData[1]._id
        };
        // this.docRequest.docArray[item.formData[0].index].attachment = "uploaded";
      };

      //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file) => {
        console.log("****************");
        console.log(this.bot.itemArray);
        console.log(this.index);
        console.log('*******uploader', this.bot.itemArray[this.lastindex].docIndex)
        file.withCredentials = false;
        //here we push the index of the file into formdata because it's the only place i could find that would hold the value.
        this.audio.play();
        file.formData.push({ "index": this.fileIndex });
        file.formData.push({ "_id": this.bot._id });
        this.dateUpdate = new Date();
      };

      //overide the onCompleteItem property of the uploader so we are
      //able to deal with the server response.
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      };

      //this.messageSimulation();

  }

  updateFileIndex(index: number) {
    this.fileIndex = index;
  }

  private isShowBot(){
    return this.showBot;
  }

  private onShowBot(data){
    console.log("onShowBot");
    console.log(data.customerFullName);
    this.botRequest.customerFullName = data.customerFullName;
    this.showBot = true;

    this.itemsBot.push( {
                    'avatar': this.bot.avatar,
                    'name': this.bot.name,
                    'user': 'bot',
                    'msj': "Hello welcome " + this.botRequest.customerFullName.split(" ")[0] + " a pleasure to help you",//this.bot.itemArray[this.index].name,
                    'date': new Date(),
                    'file': false,//this.bot.itemArray[this.index].file,
                    'show': false,
                    'docIndex': 0
                  });
    this.messageSimulation();
  }


  private typingSimulation(x: number){
    console.log("Palabras ",x);
    setTimeout(() => {
      this.botTyping = ' Typing.';
      this.cdr.detectChanges();
      console.log(this.botTyping);
      x--;
      setTimeout(() => {
        this.botTyping = ' Typing..';
        this.cdr.detectChanges();
        console.log(this.botTyping);
        x--;
        setTimeout(() => {
          this.botTyping = ' Typing...';
          this.cdr.detectChanges();
          console.log(this.botTyping);
          x--;
            if(x <= 1){
              this.sendMessgeBot(this.bot.itemArray[this.index].name,this.bot.itemArray[this.index].file);
            }else{
              this.typingSimulation(x);
            }

        },200);
      },110);
    },210);
  }

  private send() {
    if (this.newMessage) {
      var i = this.itemsBot.length + 1;
      this.itemsBot.push( {
                      'avatar': '../../assets/img/avatars/noavatar.png',
                      'name': this.botRequest.customerFullName.split(" ")[0],
                      'user': 'client',
                      'msj': this.newMessage,
                      'date': new Date(),
                      'file': false,
                      'showtime': 700,
                      'show': false,
                      'docIndex': i
                    });
      this.lastindex = this.index - 1;
      if(this.botRequest.requests.length > this.lastindex){
        console.log(this.lastindex);
        this.botRequest.requests[this.lastindex].answer = this.newMessage;
        console.log(this.botRequest.requests[this.lastindex].question);
        console.log(this.botRequest.requests[this.lastindex].answer);
      }

      this.newMessage = '';
      this.audio.play();
      this.cdr.detectChanges();

      this.messageSimulation();
    }
  }

  private sendMessgeBot(msj,file){
              setTimeout(() => {
                  this.itemsBot.push( {
                                  'avatar': this.bot.avatar,
                                  'name': this.bot.name,
                                  'user': 'bot',
                                  'msj': msj,//this.bot.itemArray[this.index].name,
                                  'date': new Date(),
                                  'file': file,//this.bot.itemArray[this.index].file,
                                  'show': false,
                                  'docIndex': this.index
                                });
                  this.index++;
                  this.botTyping = ' online';
                  this.audio.play();
                  this.cdr.detectChanges();
              }, 100);
  }

  private messageSimulation() {
    if(this.bot.itemArray){
      if(this.bot.itemArray.length > this.index){
      console.log("BOT messageSimulation  _------------------_");
      console.log(this.bot.itemArray[this.index].name);


      var x = this.bot.itemArray[this.index].name.split(" ").length;

      this.typingSimulation(x);
      //this.typingSimulation();

    }else{
      this.sendMessgeBot(this.bot.thanks,false);
      this.saveRequest();
      console.log(this.botRequest);
    }
    }

  }

  private saveRequest(){
    this.appService.setLoading(true);
    this.appService.createBotRequest( this.botRequest )
      .then(res => {
        let error_str = res._body.slice(26);

          //this.socketService.sendMessage('new Request from save');
          console.log(res);
          this.appService.setLoading(false);
          this.cdr.detectChanges();

      });
  }
}
