import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTableComponent } from './simple-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdCardModule, MdCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    PageHeaderModule,
    BreadcrumbsModule,
    MdCheckboxModule,
    MdCardModule
  ],
  declarations: [SimpleTableComponent]
})
export class SimpleTableModule { }
