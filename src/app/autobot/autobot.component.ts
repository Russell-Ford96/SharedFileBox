import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AppService} from '../app.service';

@Component({
  selector: 'vr-autobot',
  templateUrl: './autobot.component.html',
  styleUrls: ['./autobot.component.scss']
})
export class AutobotComponent implements OnInit {
  audio = new Audio();
  url: any;
  bot: any;
  avatarService = '../../assets/avatar-chica.png';
  itemsBot:any[] = [{}];

  constructor(
    private appService: AppService,
    private cdr:ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.url = route.params.map(p => p.url);
    this.audio.src = "../../assets/send.wav";
    this.audio.load();
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



  private messageSimulation() {
    if(this.bot.itemArray){
      console.log("BOT messageSimulation  _------------------_");
      console.log(this.bot.itemArray[0].name);
      this.itemsBot.splice(0, 1);
      var showtime = 100;
      var i = -1;
      this.itemsBot = [];
      for (let item in this.bot.itemArray) {

        if(this.bot.itemArray[item].file){
         i++;
        }

                  console.log(showtime);
                  this.itemsBot.push( {'avatar': this.avatarService,
                                  'name': 'Eva',
                                  'msj': this.bot.itemArray[item].name,
                                  'date': new Date(),
                                  'file': this.bot.itemArray[item].file,
                                  'showtime': showtime,
                                  'show': false,
                                  'docIndex': i
                                });
                  console.log(this.itemsBot[0]);
                  showtime = showtime + 700;

      }

      for (let item in this.itemsBot) {

        setTimeout(() => {
            this.audio.play();
            this.itemsBot[item].show = true;
            this.cdr.detectChanges();
        }, this.itemsBot[item].showtime);

      }

    }

  }

}
