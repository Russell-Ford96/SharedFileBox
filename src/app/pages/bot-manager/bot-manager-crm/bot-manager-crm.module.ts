import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotManagerCRMComponent } from './bot-manager-crm.component';
import { MdButtonModule, MdCheckboxModule, MdIconModule, MdMenuModule, MdSnackBarModule, MdTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TasksWidgetModule } from './tasks-widget/tasks-widget.module';
import { ProjectWidgetModule } from './project-widget/project-widget.module';
import { UsertableWidgetModule } from './usertable-widget/usertable-widget.module';
import { MessageWidgetModule } from './message-widget/message-widget.module';
import { MeetingWidgetModule } from './meeting-widget/meeting-widget.module';
import { MarketWidgetModule } from './market-widget/market-widget.module';
import { PageHeaderModule } from '../../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdCheckboxModule,
    FlexLayoutModule,
    MdButtonModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdIconModule,
    MdMenuModule,
    PageHeaderModule,
    BreadcrumbsModule,

    // Widgets
    TasksWidgetModule,
    ProjectWidgetModule,
    UsertableWidgetModule,
    MessageWidgetModule,
    MeetingWidgetModule,
    MarketWidgetModule
  ],
  declarations: [
    BotManagerCRMComponent
  ],
  exports: [
    BotManagerCRMComponent
  ]
})
export class BotManagerCrmModule { }
