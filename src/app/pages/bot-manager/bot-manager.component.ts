import { Component, OnInit } from '@angular/core';
import { ROUTE_TRANSITION } from '../../app.animation';

@Component({
  selector: 'vr-bot-manager',
  templateUrl: './bot-manager.component.html',
  styleUrls: ['./bot-manager.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotManagerComponent implements OnInit {

  width = {
    single: (100) + '%',
    double: (100 / 2) + '%',
    triple: (100 / 3) + '%',
  };

  constructor() { }

  ngOnInit() {
  }

}
