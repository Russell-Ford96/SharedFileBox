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
  @Output() newBot = new EventEmitter<boolean>();
  @Input() bots: Bot[];

  rows;
  tableHover = true;
  tableStriped = true;
  tableCondensed = true;
  tableBordered = true;


  constructor() {
  }


  onNewBot(){
    this.newBot.emit(true);
  }


  onBotSelect(bot:Bot){
    this.botWasSelected.emit(bot);
  }

  ngOnInit() {
  }
}
