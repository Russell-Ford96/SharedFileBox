import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { AppService } from '../../../app.service';

@Component({
  selector: 'vr-profile-bots',
  templateUrl: './bots-overview.component.html',
  styleUrls: ['./bots-overview.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotsOverviewComponent implements OnInit, AfterViewInit {

  @ViewChild('sticky') sticky: ElementRef;

  rows;

  tableHover = true;
  tableStriped = true;
  tableCondensed = true;
  tableBordered = true;
  bots: any[];

  constructor(private appService: AppService) { }


  getAllBots(){

    this.appService.getAllBotData().subscribe((bots: any[]) => {
      this.bots = bots;
      console.log("*************************************");
      console.log(this.bots);
    });


  }

  ngAfterViewInit() {
    // const scrollbar = Scrollbar.get(document.querySelector('main-scrollbar'));
    // const marginTop = 60 + 98;
    // const scrollHeight = scrollbar.targets.content.clientHeight - marginTop;
    //
    // scrollbar.addListener(({ offset }) => {
    //   const distance = offset.y;
    //
    // });
  };

  ngOnInit() {
    this.getAllBots();
  }
}
