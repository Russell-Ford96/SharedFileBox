import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { Bot } from '../bot.model';


@Component({
  selector: 'vr-profile-bots',
  templateUrl: './bots-overview.component.html',
  styleUrls: ['./bots-overview.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotsOverviewComponent implements OnInit {
  @Output() botWasSelected = new EventEmitter<Bot>();
  @Output() newBot = new EventEmitter<boolean>() 
  @Input() bots: Bot[];

  //@ViewChild('sticky') sticky: ElementRef;

  rows;
  tableHover = true;
  tableStriped = true;
  tableCondensed = true;
  tableBordered = true;


  constructor() { }


  onNewBot(){
    this.newBot.emit(true);
  }


  onBotSelect(bot:Bot){
    console.log("****************** Bot Selected *******************");
    console.log(bot);

    this.botWasSelected.emit(bot);
  }

  // getAllBots(){
  //
  //   this.appService.getAllBotData().subscribe((bots: any[]) => {
  //     this.bots = bots;
  //     console.log("****************** All my bots *******************");
  //     console.log(this.bots);
  //   });
  //
  //
  // }

  // ngAfterViewInit() {
  //   // const scrollbar = Scrollbar.get(document.querySelector('main-scrollbar'));
  //   // const marginTop = 60 + 98;
  //   // const scrollHeight = scrollbar.targets.content.clientHeight - marginTop;
  //   //
  //   // scrollbar.addListener(({ offset }) => {
  //   //   const distance = offset.y;
  //   //
  //   // });
  // };

  ngOnInit() {
    //this.getAllBots();
  }
}
