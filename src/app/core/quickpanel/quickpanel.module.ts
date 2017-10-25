import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuickpanelComponent } from './quickpanel.component';
import { MdButtonModule, MdListModule, MdProgressBarModule, MdTabsModule } from '@angular/material';
import { ScrollbarModule } from '../scrollbar/scrollbar.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdButtonModule,
    MdProgressBarModule,
    MdTabsModule,
    MdListModule,
    ScrollbarModule
  ],
  declarations: [QuickpanelComponent],
  exports: [QuickpanelComponent]
})
export class QuickpanelModule { }
