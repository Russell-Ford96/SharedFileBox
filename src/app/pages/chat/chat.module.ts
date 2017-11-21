import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule,
  MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdRippleModule, MdSidenavModule,
  MdToolbarModule
} from '@angular/material';
import { UtilsModule } from '../../core/utils/utils.module';
import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    FlexLayoutModule,
    MdInputModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdRippleModule,
    MdMenuModule,
    MdButtonModule,
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
