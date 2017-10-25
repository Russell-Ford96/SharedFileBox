import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedPieChartWidgetComponent } from './advanced-pie-chart-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdIconModule, MdMenuModule, MdTabsModule } from '@angular/material';
import { ScrollbarModule } from '../../../../core/scrollbar/scrollbar.module';
import { AdvancedPieChartComponent } from './advanced-pie-chart/advanced-pie-chart.component';
import { UtilsModule } from '../../../../core/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdIconModule,
    MdTabsModule,
    MdButtonModule,
    MdMenuModule,
    ScrollbarModule,
    UtilsModule
  ],
  declarations: [
    AdvancedPieChartWidgetComponent,
    AdvancedPieChartComponent
  ],
  exports: [
    AdvancedPieChartWidgetComponent
  ]
})
export class AdvancedPieChartWidgetModule { }
