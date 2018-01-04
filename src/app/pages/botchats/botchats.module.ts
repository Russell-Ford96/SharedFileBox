import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotChatsComponent } from './botchats.component';
import { PageHeaderModule } from "../../core/page-header/page-header.module";
import { BreadcrumbsModule } from "../../core/breadcrumbs/breadcrumbs.module";
import { ScrollbarModule } from "../../core/scrollbar/scrollbar.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotchatsListComponent } from './botchats-list/botchats-list.component';
import { BotchatsDetailComponent } from './botchats-detail/botchats-detail.component';

import {
  MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRippleModule, MatSidenavModule,
  MatToolbarModule, MatGridListModule, MatCardModule,
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    ScrollbarModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
  ],

  declarations: [
    BotChatsComponent,
    BotchatsListComponent,
    BotchatsDetailComponent,

  ],
})


export class BotChatsModule{}
