import { Routes } from '@angular/router';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';
import { TableSortingComponent } from './table-sorting/table-sorting.component';
import { TableFilteringComponent } from './table-filtering/table-filtering.component';
import { DatatableComponent } from './datatable/datatable.component';

export const tablesRoutes: Routes = [
  {
    path: 'tables/simple-table',
    component: SimpleTableComponent
  },
  {
    path: 'tables/table-pagination',
    component: TablePaginationComponent
  },
  {
    path: 'tables/table-sorting',
    component: TableSortingComponent
  },
  {
    path: 'tables/table-filtering',
    component: TableFilteringComponent
  },
  {
    path: 'tables/datatable',
    component: DatatableComponent
  }
];
