import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';
import { DashboardCrmModule } from './dashboard-crm/dashboard-crm.module';
import { DashboardStatisticsModule } from './dashboard-statistics/dashboard-statistics.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    ScrollbarModule,

    // Dashboards
    DashboardCrmModule,
    DashboardStatisticsModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
