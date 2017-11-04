import { Component, Input, OnInit } from '@angular/core';
import { ROUTE_TRANSITION } from '../../../app.animation';

@Component({
  selector: 'vr-bot-manager-crm',
  templateUrl: './bot-manager-crm.component.html',
  styleUrls: ['./bot-manager-crm.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotManagerCRMComponent implements OnInit {

  @Input() hideHeader: boolean;

  layoutGap = {
    'lt-md': '16px',
    'gt-md': '24px'
  };

  flexWidth = {
    'lt-sm': 'auto',
    'gt-sm': `calc(50% - ${this.layoutGap['lt-md']}`,
    'gt-md': `calc(50% - ${this.layoutGap['gt-md']}`
  };

  constructor() { }

  ngOnInit() {
  }

}
