import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { ComponentsAddItemBotModule } from '../../components/components-add-item-bot/components-add-item-bot.module';

@Component({
  selector: 'vr-create-bot',
  templateUrl: './bots-creation.component.html',
  styleUrls: ['./bots-creation.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotsCreationComponent  {


}
