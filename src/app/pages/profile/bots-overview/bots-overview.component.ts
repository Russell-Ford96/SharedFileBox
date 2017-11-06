import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';

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

  constructor() { }

  ngAfterViewInit() {
    const scrollbar = Scrollbar.get(document.getElementById('main-scrollbar'));
    const marginTop = 60 + 98;
    const scrollHeight = scrollbar.targets.content.clientHeight - marginTop;

    scrollbar.addListener(({ offset }) => {
      const distance = offset.y;

    });
  };

  ngOnInit() {
    this.rows = [
      {
        'name': 'Auto Insurance Bot',
        'url': '/azure/autoBot',
        'active': true,

      },
      {
        'name': 'Jewellery Insurance Bot',
        'url': '/azure/jewelBot',
        'active': false,

      },
      {
        'name': 'Property Insurance Bot',
        'url': '/azure/propBot',
        'active': true,

      }

    ];
  }
}
