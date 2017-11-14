import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatRippleModule, MatSidenavModule } from '@angular/material';
import { ScrollbarModule } from '../scrollbar/scrollbar.module';
import { TourModule } from '../tour/tour.module';
import { SettingsModule } from 'app/core/settings/settings.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { QuickpanelModule } from '../quickpanel/quickpanel.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    ScrollbarModule,
    TourModule,
    SidenavModule,
    SettingsModule,
    ToolbarModule,
    QuickpanelModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule { }
