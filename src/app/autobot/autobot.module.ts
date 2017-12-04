import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutobotComponent } from './autobot.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UtilsModule } from '../core/utils/utils.module';
import { ScrollbarModule } from '../core/scrollbar/scrollbar.module';
import { PageHeaderModule } from '../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../core/breadcrumbs/breadcrumbs.module';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { FileUploadModule } from "ng2-file-upload/";


import {
  MatButtonModule,MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatRippleModule,
  MatSidenavModule,MatToolbarModule,MatCardModule
} from '@angular/material';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    FlexLayoutModule,
    NgxfUploaderModule.forRoot(),
    FileUploadModule,
    //Material Design
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule

  ],
  declarations: [AutobotComponent, WelcomeComponent]
})
export class AutobotModule { }
