import { Routes } from '@angular/router';
import { BotManagerComponent } from './bot-manager.component';
import { BotManagerCRMComponent } from './bot-manager-crm/bot-manager-crm.component';
import { BotManagerStatisticsComponent } from './bot-manager-statistics/bot-manager-statistics.component';
import { BotManagerAddItemComponent } from './bot-manager-add-item/bot-manager-add-item.component';
export const botManagerRoutes: Routes = [
  {
    path: '',
    component: BotManagerStatisticsComponent,
    pathMatch: 'full'
  },
  {
    path: 'bot-manager/all-in-one',
    component: BotManagerComponent,
  },
  {
    path: 'bot-manager/crm',
    component: BotManagerCRMComponent,
  },
  {
    path: 'bot-manager/add-bot',
    component: BotManagerAddItemComponent,
  }

];
