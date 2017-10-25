import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTableModule } from './simple-table/simple-table.module';
import { TablePaginationModule } from './table-pagination/table-pagination.module';
import { TableSortingModule } from './table-sorting/table-sorting.module';
import { TableFilteringModule } from './table-filtering/table-filtering.module';
import { DatatableModule } from './datatable/datatable.module';

@NgModule({
  imports: [
    CommonModule,
    SimpleTableModule,
    TablePaginationModule,
    TableSortingModule,
    TableFilteringModule,
    DatatableModule
  ],
  declarations: []
})
export class TablesModule { }
