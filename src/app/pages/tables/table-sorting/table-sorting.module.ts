import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSortingComponent } from './table-sorting.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollbarModule } from '../../../core/scrollbar/scrollbar.module';
import { PageHeaderModule } from '../../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';
import { MdCheckboxModule, MdSortModule, MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ScrollbarModule,
    PageHeaderModule,
    BreadcrumbsModule,
    MdTableModule,
    CdkTableModule,
    MdSortModule,
    MdCheckboxModule
  ],
  declarations: [TableSortingComponent]
})
export class TableSortingModule { }
