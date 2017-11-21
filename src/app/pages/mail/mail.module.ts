import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs';
import {
  MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRippleModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {PageHeaderModule} from "../../core/page-header/page-header.module";
import {BreadcrumbsModule} from "../../core/breadcrumbs/breadcrumbs.module";
import {FormsModule} from "@angular/forms";
import {UtilsModule} from "../../core/utils/utils.module";
import {ScrollbarModule} from "../../core/scrollbar/scrollbar.module";

import {InboxComponent} from "./inbox/inbox.component";
import {SentComponent} from "./sent/sent.component";
import {TimeAgoPipe} from "time-ago-pipe";

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    PageHeaderModule,
    BreadcrumbsModule,
    FormsModule,
    UtilsModule,
    ScrollbarModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,

  ],
  declarations: [InboxComponent,
                  SentComponent,
                  TimeAgoPipe]
})
export class MailModule { }
