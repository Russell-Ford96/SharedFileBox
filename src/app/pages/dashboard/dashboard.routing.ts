import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardCRMComponent } from './dashboard-crm/dashboard-crm.component';
import { DashboardStatisticsComponent } from './dashboard-statistics/dashboard-statistics.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardStatisticsComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard/all-in-one',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/crm',
    component: DashboardCRMComponent,
  }
];
