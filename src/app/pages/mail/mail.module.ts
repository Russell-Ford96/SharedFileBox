import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs';
import {
  MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRippleModule, MatSidenavModule,
  MatToolbarModule, MatGridListModule, MatCardModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageHeaderModule } from "../../core/page-header/page-header.module";
import { BreadcrumbsModule } from "../../core/breadcrumbs/breadcrumbs.module";
import { FormsModule } from "@angular/forms";
import { UtilsModule } from "../../core/utils/utils.module";
import { ScrollbarModule } from "../../core/scrollbar/scrollbar.module";

import { InboxComponent } from "./inbox/inbox.component";
import { SentComponent } from "./sent/sent.component";
import { TimeAgoPipe } from "time-ago-pipe";
import { SentListComponent } from './sent/sent-list/sent-list.component';
import { SentDetailComponent } from './sent/sent-detail/sent-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    FlexLayoutModule,
    PageHeaderModule,
    BreadcrumbsModule,
    FormsModule,
    UtilsModule,
    ScrollbarModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    BrowserAnimationsModule,
  ],
  declarations: [ InboxComponent,
                  SentComponent,
                  TimeAgoPipe,
                  SentListComponent,
                  SentDetailComponent]
})
export class MailModule { }
