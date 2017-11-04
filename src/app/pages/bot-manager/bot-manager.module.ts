import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotManagerComponent } from './bot-manager.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdIconModule, MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';
import { BotManagerCrmModule } from './bot-manager-crm/bot-manager-crm.module';
import { BotManagerStatisticsModule } from './bot-manager-statistics/bot-manager-statistics.module';
import { BotManagerAddItemModule } from './bot-manager-add-item/bot-manager-add-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MdIconModule,
    MdTabsModule,
    MdButtonModule,
    ScrollbarModule,

    // Dashboards
    BotManagerCrmModule,
    BotManagerStatisticsModule,
    BotManagerAddItemModule
  ],
  declarations: [
    BotManagerComponent
  ]
})
export class BotManagerModule { }
