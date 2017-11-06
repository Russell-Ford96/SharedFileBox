import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';

@Component({
  selector: 'vr-create-bot',
  templateUrl: './bots-creation.component.html',
  styleUrls: ['./bots-creation.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotsCreationComponent  {


}
