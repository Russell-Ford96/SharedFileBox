import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from '../../../reducers/index';
import { PageHeaderModule } from '../../../core/page-header/page-header.module';
import { BotManagerAddItemComponent } from './bot-manager-add-item.component';
import { ComponentsAddItemBotModule } from '../../components/components-add-item-bot/components-add-item-bot.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCheckboxModule, MdIconModule, MdMenuModule, MdSnackBarModule, MdTooltipModule } from '@angular/material';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    FlexLayoutModule,
    ComponentsAddItemBotModule,
        MdCheckboxModule,
        MdButtonModule,
        MdTooltipModule,
        MdSnackBarModule,
        MdIconModule,
        MdMenuModule,
        BreadcrumbsModule
  ],
  declarations: [
    BotManagerAddItemComponent
  ],
  exports: [
    BotManagerAddItemComponent
  ]
})
export class BotManagerAddItemModule { }
