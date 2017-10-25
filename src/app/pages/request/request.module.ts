import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdIconModule, MdPaginatorModule, MdTableModule} from '@angular/material';
import {QuillModule} from 'ngx-quill';
import {RequestComponent} from './request.component';
import {FormsModule} from '@angular/forms';
import {ScrollbarModule} from '../../core/scrollbar/scrollbar.module';
import {PageHeaderModule} from '../../core/page-header/page-header.module';
import {BreadcrumbsModule} from '../../core/breadcrumbs/breadcrumbs.module';
import {CdkTableModule} from '@angular/cdk/table';
import {RequestDetailComponent} from './request-detail/request-detail.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MdIconModule,
    QuillModule,
    FormsModule,
    FlexLayoutModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    MdTableModule,
    CdkTableModule,
    MdPaginatorModule,
    RouterModule.forChild([

    ])
  ],
  declarations: [ RequestComponent ,
                  RequestDetailComponent]
})
export class RequestModule { }
