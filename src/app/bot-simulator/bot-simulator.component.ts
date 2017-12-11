import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Bot } from '../pages/profile/bot.model';
import 'rxjs/add/operator/map';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AppService} from '../app.service';


@Component({
  selector: 'app-bot-simulator',
  templateUrl: './bot-simulator.component.html',
  styleUrls: ['./bot-simulator.component.scss']
})

export class BotSimulatorComponent {
  @Input() bot:Bot;
  @Input() reloadSimulator:boolean;

  itemsBot:any[] = [{}];

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:5000/api/upload', itemAlias: "single", autoUpload: true
  });
  audio = new Audio();
  id: any;
  docRequest: any;
  fileIndex: number;

  dateUpdate = new Date();


  constructor(
    private appService: AppService,
    private cdr:ChangeDetectorRef
  ) {
    //this.id = route.params.map(p => p.id);
    this.audio.src = "../../assets/send.wav";
    this.audio.load();
    this.reloadSimulator = false;
  }

  ngOnInit() {
    this.messageSimulation();



    this.uploader.onBeforeUploadItem = (item: any) => {
      item.withCredentials = false;
      this.uploader.options.additionalParameter = {
        index: item.formData[0].index,
        _id: item.formData[1]._id,
        createdBy: 'this.docRequest.createdBy', // put the createdBy
        _refnumb: 'this.docRequest.refnumb'  // put the refnumb
      };
    };

    this.uploader.onAfterAddingFile = (file) => {
      console.log('*******uploader', this.docRequest)
      file.withCredentials = false;
      this.audio.play();
      file.formData.push({ "index": this.fileIndex });
      file.formData.push({ "_id": this.docRequest._id });
      this.dateUpdate = new Date();
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

    };

  }

  private updateFileIndex(index: number) {
    this.fileIndex = index;
  }

  private ngOnChanges(){
   console.log("---------- bot-simulator ngOnChanges -------------");
   console.log(this.bot);
   if(this.reloadSimulator){
     this.messageSimulation();
   }
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
                  this.itemsBot.push( {'avatar': this.bot.avatar,
                                  'name': this.bot.name,
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
