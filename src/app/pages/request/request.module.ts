import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule, MatPaginatorModule, MatTableModule} from '@angular/material';
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
import {AppService} from "../../app.service";

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    QuillModule,
    FormsModule,
    FlexLayoutModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    RouterModule.forChild([

    ])
  ],
  providers:[AppService],
  declarations: [ RequestComponent ,
                  RequestDetailComponent]
})
export class RequestModule { }
