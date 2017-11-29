import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutobotComponent } from './autobot.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRippleModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { UtilsModule } from '../core/utils/utils.module';
import { ScrollbarModule } from '../core/scrollbar/scrollbar.module';
import { PageHeaderModule } from '../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../core/breadcrumbs/breadcrumbs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    FlexLayoutModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
  ],
  declarations: [AutobotComponent]
})
export class AutobotModule { }
